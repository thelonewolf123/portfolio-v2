# Project Structure

Every file in the `agents/` directory mapped to its architectural role.

```
agents/
├── .env                          # Environment configuration
├── .gitignore
├── docker-entrypoint.sh          # Container firewall + entrypoint
├── remote_server.sh              # SSH remote deployment
│
├── data/                         # Runtime persistence
│   ├── chat_history.db           # SQLite: chat metadata + stored images
│   ├── checkpoints.db            # SQLite: LangGraph conversation checkpoints
│   ├── checkpoints.db-shm
│   └── checkpoints.db-wal
│
├── public/                       # Frontend (Alpine.js SPA)
│   ├── index.html                # Main HTML + Alpine.js templates
│   └── js/
│       ├── app.js                # Root Alpine component (state + actions)
│       ├── chat.js               # SSE streaming client
│       ├── sidebar.js            # Chat list CRUD API client
│       └── utils.js              # Markdown rendering, date formatting
│
└── src/                          # Backend (Python)
    ├── main.py                   # ENTRY POINT: App mode dispatcher
    │
    ├── api/                      # FastAPI Server (chatbot mode)
    │   ├── __init__.py           # App factory, static file mounting
    │   ├── routes.py             # REST endpoints: chat CRUD + SSE stream
    │   └── sse.py                # SSE streaming engine
    │
    ├── agent/                    # Agent Core
    │   ├── __init__.py           # Public exports
    │   ├── core.py               # Agent factory (dispatches by AGENT_MODE)
    │   └── llm.py                # LLM config (OpenRouter + Grok-4)
    │
    ├── prompt/                   # Prompt System
    │   ├── __init__.py           # Exports + composite middleware
    │   ├── system.py             # Base prompt + DB schema injection
    │   └── middleware.py         # Prompt composition utilities
    │
    ├── tools/                    # LangChain Tool Layer
    │   ├── __init__.py           # Tool exports
    │   ├── sql.py                # run_sql — PostgreSQL queries
    │   ├── cloudwatch.py         # query_cloudwatch_logs — AWS Logs
    │   ├── ip_lookup.py          # lookup_ip_countries — External API
    │   └── database.py           # Connection manager (read-only enforcement)
    │
    ├── db/                       # Persistence Layer
    │   ├── __init__.py           # Exports
    │   ├── models.py             # SQLAlchemy: Chat + Image models
    │   └── repository.py         # CRUD repositories
    │
    └── aegis/                    # Aegis System (code execution + MCP)
        ├── __init__.py           # Lazy imports
        ├── agent.py              # Aegis agent factory
        ├── instructions.py       # System prompt + investigation patterns
        ├── manifest.py           # Tool introspection & formatting
        │
        ├── tools/                # Aegis-specific tools
        │   ├── __init__.py
        │   ├── code_execution.py # create_execute_code_tool()
        │   └── image_store.py    # store_image tool
        │
        ├── sandbox/              # Code Execution Sandbox
        │   ├── __init__.py
        │   ├── executor.py       # NSJail process manager
        │   └── runner.py         # Script executed INSIDE sandbox
        │
        ├── server/               # ToolServer for sandbox
        │   ├── __init__.py
        │   └── api.py            # Dynamic FastAPI + lifecycle mgmt
        │
        └── mcp/                  # MCP Protocol Server
            ├── __init__.py
            ├── server.py         # FastMCP server factory
            ├── adapters.py       # LangChain → FastMCP adapters
            ├── routes.py         # Custom HTTP routes (images, health)
            ├── auth.py           # Bearer token authentication
            └── registrations/
                ├── __init__.py
                └── schema.py     # Schema + analysis guide tools
```

## How the Layers Connect

```mermaid
graph TB
    subgraph root["agents/ (root)"]
        ENV[".env"]
        DOCKER["docker-entrypoint.sh"]
    end

    subgraph entry["src/"]
        MAIN["main.py"]
    end

    subgraph layers["Layer Architecture"]
        direction TB
        L_API["api/ — FastAPI / SSE"]
        L_AGE["agent/ — Agent Factory + LLM"]
        L_PRO["prompt/ — System Prompts"]
        L_TOOL["tools/ — LangChain Tools"]
        L_DB["db/ — SQLAlchemy Models"]
        L_AEG["aegis/ — Sandbox + MCP + Instructions"]
    end

    subgraph frontend["public/"]
        UI["index.html + js/*"]
    end

    subgraph infra["Infrastructure"]
        DOCKER_COMPOSE["docker-compose.yml"]
        DOCKERFILE["Dockerfile.agent"]
    end

    ENV --> MAIN
    ENV --> L_AEG
    DOCKERFILE --> DOCKER_COMPOSE
    DOCKER --> MAIN

    MAIN --> L_API
    MAIN --> L_AGE
    L_AGE --> L_PRO
    L_AGE --> L_TOOL
    L_AGE --> L_AEG
    L_API --> L_DB

    UI --> L_API

    style root fill:#e8f5e9
    style entry fill:#e3f2fd
    style frontend fill:#fff3e0
    style infra fill:#f3e5f5
```

## File Dependency Graph

```mermaid
graph LR
    subgraph "Import Dependencies"
        MAIN["main.py"] --> API["api/"]
        MAIN --> AEG_AGENT["aegis/agent.py"]
        MAIN --> AEG_MCP["aegis/mcp/"]

        API_ROUTES["api/routes.py"] --> DB["db/"]
        API_ROUTES --> AGENT_CORE["agent/core.py"]
        API_ROUTES --> SSE["api/sse.py"]

        SSE --> AGENT_CORE
        SSE --> DB

        AGENT_CORE --> LLM["agent/llm.py"]
        AGENT_CORE --> PROMPT["prompt/"]
        AGENT_CORE --> AEG_AGENT

        AEG_AGENT --> AEG_INST["aegis/instructions.py"]
        AEG_AGENT --> AEG_MANIFEST["aegis/manifest.py"]
        AEG_AGENT --> AEG_TOOLS["aegis/tools/"]
        AEG_AGENT --> PROMPT

        AEG_TOOLS --> AEG_TOOL_SERVER["aegis/server/"]
        AEG_TOOLS --> AEG_SANDBOX["aegis/sandbox/"]

        AEG_SANDBOX --> AEG_SANDBOX_RUNNER["aegis/sandbox/runner.py"]

        AEG_MCP --> AEG_ADAPTERS["aegis/mcp/adapters.py"]
        AEG_MCP --> AEG_AUTH["aegis/mcp/auth.py"]
        AEG_MCP --> AEG_MCP_REG["aegis/mcp/registrations/"]

        TOOLS["tools/"] --> TOOL_DB["tools/database.py"]
    end
```
