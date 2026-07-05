# Architecture

## High-Level System Diagram

```mermaid
graph TB
    subgraph User["User"]
        UI[Alpine.js Chat UI]
    end

    subgraph FastAPI["FastAPI Server chatbot mode"]
        API[API Routes]
        SSE[SSE Stream]
        CHAT[Chat CRUD]
    end

    subgraph Aegis["Aegis Agent Core"]
        AGENT[Agent Factory<br/>create_agent]
        LLM[LLM<br/>OpenRouter/Grok]
        LANGGRAPH[LangGraph<br/>Checkpointing & Streaming]
    end

    subgraph Tools["Tool Layer"]
        RUN_SQL[run_sql<br/>PostgreSQL]
        CW[query_cloudwatch_logs<br/>AWS CloudWatch]
        IP[lookup_ip_countries<br/>External API]
        IMG[store_image<br/>SQLite]
    end

    subgraph Sandbox["Code Execution Sandbox"]
        EXEC[execute_code]
        TS[ToolServer<br/>127.0.0.1:8787]
        NSJAIL[NSJail<br/>Secure Sandbox]
        RUNNER[runner.py<br/>Inside Sandbox]
    end

    subgraph MCP["MCP Server mcp mode"]
        FASTMCP[FastMCP Server]
        MCP_TOOLS[MCP Tool Registry]
        SCHEMA[Schema & Guide Tools]
    end

    subgraph Storage["Storage"]
        PG[(PostgreSQL<br/>WatchWithMe DB)]
        CW_LOGS[(CloudWatch Logs)]
        CHAT_DB[(SQLite<br/>Chat History)]
        CKPT_DB[(SQLite<br/>Checkpoints)]
    end

    UI -->|HTTP/SSE| API
    API --> SSE
    SSE --> AGENT
    
    AGENT -->|AGENT_MODE| LANGGRAPH
    LANGGRAPH --> LLM
    
    AGENT -->|direct calls| RUN_SQL
    AGENT -->|direct calls| CW
    AGENT -->|direct calls| IP
    AGENT -->|direct calls| IMG
    
    AGENT -->|complex analysis| EXEC
    EXEC -->|spawns| TS
    TS --> RUN_SQL
    TS --> CW
    TS --> IP
    TS --> IMG
    EXEC -->|NSJail| NSJAIL
    NSJAIL -->|HTTP localhost| TS
    NSJAIL --> RUNNER
    
    RUN_SQL --> PG
    CW --> CW_LOGS
    IP --> IP_API[IP-to-Country API]
    IMG --> CHAT_DB
    
    FASTMCP --> MCP_TOOLS
    MCP_TOOLS --> RUN_SQL
    MCP_TOOLS --> CW
    MCP_TOOLS --> IP
    MCP_TOOLS --> IMG
    SCHEMA --> PG
    
    CHAT --> CHAT_DB
    LANGGRAPH --> CKPT_DB
    
    linkStyle default stroke-width:2px
```

## Component Overview

### 1. Agent Core (`agent/`)
Factory that creates LangChain agents with LLM (OpenRouter/Grok-4), checkpointing (SQLite), and configurable execution strategy.

### 2. Aegis System (`aegis/`)
The dual-mode execution engine. Includes the agent factory, sandbox executor, tool server, MCP server, and dynamic prompt instructions.

### 3. API Layer (`api/`)
FastAPI server with REST endpoints for chat CRUD and SSE streaming for real-time agent responses.

### 4. Tools (`tools/`)
Three primary LangChain tools: `run_sql` (PostgreSQL), `query_cloudwatch_logs` (AWS), `lookup_ip_countries` (external API).

### 5. Database (`db/`)
SQLAlchemy models for chat history and stored images (matplotlib charts), using SQLite.

### 6. Prompt System (`prompt/`)
Dynamic prompt builder that injects the database schema and current datetime. Supports composable middleware for extending prompts.

## Data Flow

### Chatbot Mode Flow

```mermaid
sequenceDiagram
    participant U as User
    participant API as FastAPI
    participant SSE as SSE Stream
    participant AGT as Agent
    participant LLM as LLM
    participant TL as Tools
    
    U->>API: POST message + thread_id
    API->>SSE: stream_agent_response()
    SSE->>AGT: create_agent(tools)
    SSE->>AGT: agent.stream({messages})
    
    loop For each agent step
        AGT->>LLM: model.invoke(prompt)
        LLM-->>AGT: response (text or tool_call)
        
        alt Tool Call
            AGT->>TL: tool.invoke(args)
            TL-->>AGT: result
            SSE-->>U: event: tool_call
            SSE-->>U: event: tool_result
        else Text Response
            SSE-->>U: event: content
        end
    end
    
    SSE-->>U: event: done
```

### Aegis Code Execution Flow

```mermaid
sequenceDiagram
    participant AGT as Agent
    participant EC as execute_code
    participant TS as ToolServer
    participant NSJ as NSJail
    participant RN as runner.py
    
    AGT->>EC: execute_code(code)
    EC->>TS: ensure_running()
    TS-->>EC: OK (port 8787)
    EC->>NSJ: nsjail [args] python /runner.py
    
    Note over NSJ,RN: Code piped via stdin as JSON
    
    NSJ->>RN: stdin (manifest + code)
    RN->>RN: exec(code, namespace)
    
    Note over RN: Code calls RUN_SQL()
    RN->>TS: POST /invoke/run_sql
    TS-->>RN: {"result": [...]}
    
    Note over RN: Code calls STORE_IMAGE()
    RN->>TS: POST /invoke/store_image
    TS-->>RN: {"result": {"url": "/img/1.png"}}
    
    RN-->>NSJ: stdout (JSON result)
    NSJ-->>EC: stdout
    EC-->>AGT: result string
```

## Configuration

The system is controlled by two key environment variables:

| Variable | Values | Description |
|---|---|---|
| `APP_MODE` | `chatbot` (default), `mcp` | Deployment mode |
| `AGENT_MODE` | `default`, `aegis` | Agent execution strategy |

This separation means you can run any agent mode under any deployment mode — for example, an MCP server with Aegis code execution, or a chatbot with the default direct-tool agent.

## File-to-Component Mapping

| Component | Directory | Key Files |
|---|---|---|
| **Entry Point** | `src/` | `main.py` — dispatches by `APP_MODE` |
| **API Layer** | `src/api/` | `routes.py` (endpoints), `sse.py` (streaming engine) |
| **Agent Core** | `src/agent/` | `core.py` (factory), `llm.py` (LLM config) |
| **Prompt System** | `src/prompt/` | `system.py` (base prompt + schema), `middleware.py` (composition) |
| **Tool Layer** | `src/tools/` | `sql.py`, `cloudwatch.py`, `ip_lookup.py`, `database.py` (connection mgr) |
| **Data Layer** | `src/db/` | `models.py` (Chat, Image), `repository.py` (CRUD) |
| **Aegis Agent** | `src/aegis/` | `agent.py` (factory), `instructions.py` (prompt), `manifest.py` (introspection) |
| **Code Sandbox** | `src/aegis/sandbox/` | `executor.py` (NSJail), `runner.py` (sandbox script) |
| **ToolServer** | `src/aegis/server/` | `api.py` (FastAPI + lifecycle) |
| **MCP Server** | `src/aegis/mcp/` | `server.py` (factory), `adapters.py`, `auth.py`, `routes.py` |
| **Frontend** | `public/` | `index.html`, `js/app.js`, `js/chat.js`, `js/sidebar.js`, `js/utils.js` |

See [Project Structure](/docs/project-structure) for the full file tree.
