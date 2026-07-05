# Deployment

## Configuration Reference

### Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `APP_MODE` | No | `chatbot` | Deployment mode: `chatbot` or `mcp` |
| `AGENT_MODE` | No | `default` | Agent mode: `default` or `aegis` |
| `PORT` | No | `8000` | HTTP server port |
| `API_KEY` | **Yes** | — | OpenRouter API key for LLM access |
| `DATABASE_URL` | **Yes** | — | PostgreSQL connection string |
| `AWS_ACCESS_KEY_ID` | **Yes** | — | AWS access key for CloudWatch |
| `AWS_SECRET_ACCESS_KEY` | **Yes** | — | AWS secret key for CloudWatch |
| `AWS_DEFAULT_REGION` | No | `us-east-1` | AWS region |
| `AWS_LOGS_GROUP` | **Yes** | — | CloudWatch log group name |
| `MCP_AUTH_TOKEN` | No | — | Bearer token for MCP auth |
| `APP_BASE_URL` | No | — | Base URL for image URLs |
| `AEGIS_ALLOW_UNSAFE` | No | `false` | Allow sandbox without NSJail (dev only) |
| `CHECKPOINT_DB_PATH` | No | `data/checkpoints.db` | SQLite path for checkpoints |
| `CHAT_HISTORY_DB_PATH` | No | `data/chat_history.db` | SQLite path for chat history |

## Deployment Modes

### Chatbot Mode

```
APP_MODE=chatbot
```

Starts a FastAPI server with:
- REST API for chat CRUD
- SSE streaming for real-time agent responses
- Static file serving for the Alpine.js frontend
- Image serving for matplotlib charts

Access at `http://localhost:8000`

### MCP Mode

```
APP_MODE=mcp
```

Starts a FastMCP server exposing all tools via the Model Context Protocol. Compatible with any MCP client (Claude Desktop, etc.).

## Docker Deployment

### Dockerfile Walkthrough

**File:** `Dockerfile.agent`

The Docker image is built in stages with security as a primary concern:

```dockerfile
FROM python:3.13-slim-bookworm

# === STAGE 1: Install build deps + NSJail ===
RUN apt-get update && apt-get install -y --no-install-recommends \
    autoconf bison flex gcc g++ git \
    libprotobuf-dev libnl-3-dev libnl-route-3-dev \
    libseccomp-dev make pkg-config protobuf-compiler \
    # Runtime deps
    libprotobuf32 libnl-3-200 libnl-route-3-200 libseccomp2 \
    iptables curl \
    && rm -rf /var/lib/apt/lists/*

# Build NSJail from source (Google's official repo)
RUN git clone --depth 1 https://github.com/google/nsjail.git /tmp/nsjail \
    && cd /tmp/nsjail && make \
    && mv nsjail /usr/local/bin/ \
    && rm -rf /tmp/nsjail \
    # Remove build deps to shrink image
    && apt-get purge -y --auto-remove autoconf bison flex gcc g++ git make \
       pkg-config protobuf-compiler

# === STAGE 2: Python dependencies ===
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
RUN useradd --create-home --shell /bin/bash aegis

WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev

# === STAGE 3: Application code ===
COPY agents/src/ ./src/
COPY agents/public/ ./public/
COPY agents/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

# Create sandbox user (UID 65534 = nobody)
RUN useradd --uid 65534 --gid 65534 --no-create-home \
    --shell /usr/sbin/nologin sandbox || true

EXPOSE 7860
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:7860/ || exit 1

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["uv", "run", "python", "src/main.py"]
```

**Key design decisions:**
- **Build NSJail from source** — Ensures latest security patches, no pre-built binary risk
- **Remove build deps after** — Reduces attack surface by not shipping compilers
- **`uv` for package management** — ~10x faster than pip, essential for CI/CD
- **Explicit sandbox user** — UID 65534 is the `nobody` user, zero privileges

### Docker Compose Walkthrough

**File:** `docker-compose.yml`

```yaml
services:
  aegis:
    build:
      context: .
      dockerfile: Dockerfile.agent
    container_name: aegis-agent
    restart: unless-stopped

    # === REQUIRED for NSJail + iptables ===
    cap_add:
      - SYS_ADMIN      # For NSJail namespace creation
      - NET_ADMIN       # For iptables firewall rules
    security_opt:
      - seccomp:unconfined    # NSJail manages its own seccomp
      - apparmor:unconfined   # Avoid double-filter conflicts

    expose:
      - 80

    environment:
      - API_KEY=${API_KEY}
      - DATABASE_URL=${DATABASE_URL}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - AWS_REGION=${AWS_REGION:-ap-south-1}
      - AWS_LOGS_GROUP=${AWS_LOGS_GROUP}
      - AGENT_MODE=${AGENT_MODE}
      - APP_MODE=${APP_MODE}
      - APP_BASE_URL=${APP_BASE_URL}
      - PORT=${PORT}
      - MCP_AUTH_TOKEN=${MCP_AUTH_TOKEN}
      - AEGIS_TOOL_SERVER_URL=http://127.0.0.1:8787

    volumes:
      - aegis-data:/app/data   # Persist SQLite databases

volumes:
  aegis-data:
    driver: local
```

**Why `seccomp=unconfined`?** NSJail applies its own seccomp-bpf filter inside the sandbox. Docker's default seccomp profile would double-filter, causing conflicts. NSJail's filter is comprehensive — it limits syscalls to only what's needed for Python execution.

**Why `SYS_ADMIN` + `NET_ADMIN`?** NSJail needs `SYS_ADMIN` to create namespaces (mount, PID, UID). `NET_ADMIN` is needed by the entrypoint script to set iptables rules for sandbox network isolation.

The application runs in a Docker container with special capabilities for sandbox security:

```dockerfile
FROM python:3.13-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nsjail \
    iptables \
    && rm -rf /var/lib/apt/lists/*

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["python", "-m", "src.main"]
```

### Running the Container

```bash
# Build
docker build -t aegis-agent .

# Run (chatbot mode with Aegis)
docker run --rm -p 8000:8000 \
  --cap-add=SYS_ADMIN \
  --cap-add=NET_ADMIN \
  --security-opt seccomp=unconfined \
  --security-opt apparmor=unconfined \
  --env-file .env \
  -e APP_MODE=chatbot \
  -e AGENT_MODE=aegis \
  aegis-agent

# Run (MCP mode)
docker run --rm -p 8000:8000 \
  --cap-add=SYS_ADMIN \
  --cap-add=NET_ADMIN \
  --security-opt seccomp=unconfined \
  --env-file .env \
  -e APP_MODE=mcp \
  aegis-agent
```

### Production Checklist

1. **Use a proper `.env` file** with all required variables
2. **Enable both capabilities** (`SYS_ADMIN` for NSJail, `NET_ADMIN` for iptables)
3. **Use `seccomp=unconfined`** — NSJail manages its own seccomp profile
4. **Set `AGENT_MODE=aegis`** for the full dual-mode experience
5. **Set `APP_BASE_URL`** for correct image URLs behind a reverse proxy
6. **Set `MCP_AUTH_TOKEN`** for production MCP deployments

## Remote Server

A convenience script is provided for remote deployment:

```bash
# Usage
./remote_server.sh <command>

# Deploy
./remote_server.sh "docker compose up -d"
```

## Database

### PostgreSQL (Primary)
The main WatchWithMe database containing users, rooms, room_members, uninstall_feedback, reports, and reviews. Accessed via `DATABASE_URL`.

### SQLite (Auxiliary)
Two SQLite databases in `agents/data/`:
- **checkpoints.db** — LangGraph conversation checkpoints
- **chat_history.db** — Chat metadata and stored images
