# Data Flow

This page documents the complete data flow for every mode and operation in the Aegis Agent system.

---

## 1. Chatbot Mode: User Sends a Message

The primary flow: a user types a question and receives a streaming response.

```mermaid
sequenceDiagram
    participant User
    participant UI as Alpine.js (public/js/app.js)
    participant API as FastAPI (api/routes.py)
    participant SSE as SSE Engine (api/sse.py)
    participant DB as SQLite (db/)
    participant CTX as Context Manager (prompt/system.py)
    participant Agent as Agent (agent/core.py)
    participant LLM as LLM (agent/llm.py)
    participant Tools as Tool Layer (tools/)

    User->>UI: Types message & clicks send
    UI->>UI: Generates thread_id (UUID v4)
    UI->>UI: Adds user message to messages[]
    UI->>API: GET /api/chat/stream?message=...&thread_id=...
    
    API->>SSE: stream_agent_response(message, thread_id)
    
    SSE->>DB: ChatRepository.create(thread_id, title)
    DB-->>SSE: chat record created
    
    SSE->>Agent: create_agent([tools])
    Agent->>Agent: Reads AGENT_MODE env var
    Agent->>Agent: Creates LangChain agent
    
    SSE->>Agent: agent.stream({"messages": [HumanMessage]}, config={thread_id})
    
    SSE-->>UI: event: start {"thread_id": "..."}
    
    loop For each agent step
        Agent->>CTX: dynamic_system_prompt(request)
        CTX->>DB: get_cached_schema() (with 4h TTL)
        DB-->>CTX: DB schema text
        CTX-->>Agent: Formatted prompt (role + schema + datetime + Aegis instructions)
        
        Agent->>LLM: model.invoke(prompt + messages)
        
        alt LLM returns text
            LLM-->>Agent: AIMessage(content="analysis...")
            SSE-->>UI: event: content {"text": "analysis..."}
            
        else LLM returns tool call
            LLM-->>Agent: AIMessage(tool_calls=[{id, name, args}])
            
            SSE-->>UI: event: tool_call {"id":"...", "name":"run_sql", "input":{...}, "status":"running"}
            
            Agent->>Tools: tool.invoke(args)
            
            alt run_sql
                Tools->>PostgreSQL: SELECT query (read-only session)
                PostgreSQL-->>Tools: JSON results
            else query_cloudwatch_logs
                Tools->>CloudWatch: StartQuery + GetQueryResults
                CloudWatch-->>Tools: structured log data
            else lookup_ip_countries
                Tools->>IP API: POST batch IPs
                IP API-->>Tools: country codes
            end
            
            Tools-->>Agent: ToolMessage(content="result...")
            SSE-->>UI: event: tool_result {"id":"...", "output":"...", "status":"complete"}
        end
    end
    
    SSE-->>UI: event: done {}
    
    UI->>UI: finalizeMessage() — merge content + toolCalls
    UI->>UI: append to messages[], clear streaming state
    UI->>API: GET /api/chats (refresh list)
    API-->>UI: updated chat list
```

---

## 2. Aegis Code Execution Flow

When the agent decides to write and execute Python code for complex analysis:

```mermaid
sequenceDiagram
    participant Agent as LangChain Agent
    participant EC as execute_code Tool (aegis/tools/code_execution.py)
    participant MGR as ToolServer Manager (aegis/server/api.py)
    participant TS as ToolServer FastAPI :8787
    participant EXEC as NSJail Executor (aegis/sandbox/executor.py)
    participant JAIL as NSJail Process
    participant RN as runner.py (inside sandbox)
    participant PY as Python exec(code)

    Agent->>EC: execute_code("import pandas as pd\nRUN_SQL('SELECT ...')")

    EC->>MGR: ensure_running()
    MGR->>TS: health check GET /health
    alt ToolServer not running
        MGR->>MGR: start uvicorn in background thread
        MGR-->>EC: ToolServer ready on :8787
    else already running
        MGR-->>EC: already running
    end

    EC->>EXEC: execute(code, manifest)
    EXEC->>EXEC: Prepare JSON: {manifest, code}

    EXEC->>JAIL: nsjail -q -Mo -t 60 --rlimit_as 2048 -u 65534 -g 65534 ...
    JAIL->>JAIL: Create namespaces, chroot, set rlimits
    JAIL->>JAIL: iptables restricts UID 65534 to localhost

    Note over JAIL,RN: Stdin piped via process stdin
    
    JAIL->>RN: stdin {manifest, code}
    RN->>RN: build_tool_namespace(manifest)
    Note over RN: Creates UPPERCASE functions:<br/>RUN_SQL = lambda q: POST /invoke/run_sql
    RN->>PY: exec(code, namespace)
    
    PY->>RN: RUN_SQL("SELECT count(*) FROM users")
    RN->>TS: POST http://127.0.0.1:8787/invoke/run_sql
    TS->>TS: LangChain tool.invoke({"query": "..."})
    
    alt run_sql
        TS->>PostgreSQL: SELECT count(*) FROM users
        PostgreSQL-->>TS: [{"count": 42}]
    end
    
    TS-->>RN: {"result": [{"count": 42}]}
    RN-->>PY: Function returns result
    
    PY->>RN: STORE_IMAGE(base64_data)
    RN->>TS: POST http://127.0.0.1:8787/invoke/store_image
    TS->>SQLite: store_image(base64_data)
    SQLite-->>TS: {"url": "/img/1.png"}
    TS-->>RN: {"result": {"url": "/img/1.png"}}
    RN-->>PY: Function returns {"url": "/img/1.png"}
    
    PY->>PY: print(json.dumps({"result": {"plot_url": "/img/1.png"}}))
    PY-->>RN: Captured stdout
    
    RN-->>JAIL: stdout result
    JAIL-->>EXEC: stdout + return code
    EXEC-->>EC: Result string
    EC-->>Agent: Result: {json analysis}
    Agent->>Agent: Continue reasoning with result
```

---

## 3. MCP Mode Flow

When an external LLM client interacts via the Model Context Protocol:

```mermaid
sequenceDiagram
    participant Client as MCP Client (Claude Desktop)
    participant MCP as FastMCP Server (aegis/mcp/server.py)
    participant AUTH as Auth Middleware (aegis/mcp/auth.py)
    participant ADAPTER as LangChain Adapter (aegis/mcp/adapters.py)
    participant TOOL as LangChain Tool
    participant EXT as External Service

    Client->>MCP: GET /mcp (SSE connection)
    MCP->>AUTH: Check Authorization header
    
    alt No token configured
        MCP-->>Client: SSE connected (no auth)
    else Valid token
        MCP-->>Client: SSE connected (authenticated)
    end
    
    Client->>MCP: Tool call: run_sql({"query": "..."})
    MCP->>ADAPTER: register_langchain_tool -> wrapper(query)
    ADAPTER->>TOOL: tool.invoke({"query": "..."})
    
    TOOL->>EXT: Execute (SQL/CloudWatch/IP)
    EXT-->>TOOL: Result
    
    TOOL-->>ADAPTER: String result
    ADAPTER-->>MCP: Wrapped result
    MCP-->>Client: Tool response
    
    Client->>MCP: Tool call: get_database_schema()
    MCP->>PostgreSQL: information_schema.columns
    PostgreSQL-->>MCP: Schema JSON
    MCP-->>Client: Structured schema
    
    Client->>MCP: Tool call: get_analysis_guide()
    MCP-->>Client: Aegis instructions (investigation patterns)
    
    Client->>MCP: Tool call: execute_code({"code": "RUN_SQL(...)"})
    MCP->>ADAPTER: execute_code handler
    ADAPTER->>TOOL_SERVER: Code execution sandbox
    TOOL_SERVER-->>ADAPTER: Result
    ADAPTER-->>MCP: Result
    MCP-->>Client: Analysis result
```

---

## 4. Message Loading on Page Refresh

When a user refreshes the page and selects a previous chat:

```mermaid
sequenceDiagram
    participant UI as Alpine.js
    participant API as FastAPI
    participant CKPT as LangGraph Checkpointer
    participant DB as SQLite (checkpoints.db)

    UI->>API: GET /api/chats
    API->>DB: ChatRepository.list_all()
    DB-->>API: [{id, title, created_at, updated_at}]
    API-->>UI: Chat list
    
    UI->>UI: User clicks on a chat
    
    UI->>API: GET /api/chats/{thread_id}/messages
    API->>CKPT: get_checkpointer().get_tuple(thread_id)
    CKPT->>DB: SELECT checkpoint FROM checkpoints
    DB-->>CKPT: Serialized state
    
    CKPT-->>API: StateCheckpoint with messages
    
    API->>API: load_messages_from_checkpoint()
    Note over API: Reconstruts:<br/>- Filters system messages<br/>- Groups AIMessages with their ToolMessages<br/>- Formats as [{role, content, toolCalls}]
    
    API-->>UI: [{role: "user", content: "..."}, {role: "assistant", content: "...", toolCalls: [...]}]
    
    UI->>UI: Render each message with markdown + tool call accordions
```

---

## 5. Image Serving Flow

```mermaid
sequenceDiagram
    participant Agent as Agent / User Code
    participant DB as SQLite (images table)
    participant API as FastAPI Route
    participant Browser

    Agent->>DB: store_image(base64_data, "image/png")
    DB-->>Agent: {"id": 1, "url": "/img/1.png"}
    
    Agent->>Agent: Includes URL in response
    
    Browser->>API: GET /img/1.png
    API->>DB: ImageRepository.get(1)
    DB-->>API: {data: base64, mime_type: "image/png"}
    API->>API: Base64 decode
    API-->>Browser: image/png (binary)
```

---

## Data Flow Summary Table

| Trigger | Source | Destination | Protocol | Data |
|---|---|---|---|---|
| User message | Alpine.js | FastAPI | HTTP GET + SSE | message text, thread_id |
| Agent step | LangGraph | LLM (OpenRouter) | HTTPS | prompt + message history |
| SQL query | Agent / Sandbox | PostgreSQL | TCP (read-only) | SQL query |
| Log query | Agent / Sandbox | AWS CloudWatch | HTTPS (boto3) | Logs Insights query |
| IP lookup | Agent / Sandbox | IP API | HTTPS | Batch IP addresses |
| Code execution | Agent | NSJail | Process spawn | Python code |
| Sandbox tool call | runner.py | ToolServer | HTTP localhost :8787 | Tool name + args |
| Image storage | runner.py / Agent | SQLite | SQLAlchemy | Base64 image data |
| Chat CRUD | Alpine.js | FastAPI | HTTP REST | Chat metadata |
| MCP tool call | External client | FastMCP | MCP Protocol | Tool name + args |
