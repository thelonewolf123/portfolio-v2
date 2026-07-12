---
sidebar_position: 2
title: System Architecture
---

# System Architecture

## A Morning in the Shop

> *"Good morning! Show me what needs reordering."*
>
> The agent checks stock levels, identifies low-running items, and lists them. *"Receive 25kg Moong Dal."* Stock updated. *"Start a bill for Sharma-ji — 2kg Sugar, 1L Oil."* Items added. *"Finalize, cash."* The bill is saved, stock decremented, and a khata credit logged for the balance. *"Generate invoice for that bill."* A GST-compliant PDF arrives in chat. *"Remind me every Monday to check expiry dates."* Done.
>
> The shop owner never opened a web app. They just chatted.

This is the experience Quartermaster is built for — a running conversation that replaces a POS system, inventory software, and accounting ledger.

Want to try it? Open [**@artemis_py_bot**](https://t.me/artemis_py_bot) on Telegram and say *"Hi"*.

## Data Flow

Every user message follows this path through the system:

```mermaid
sequenceDiagram
    participant User as 👤 Shop Owner
    participant TG as Telegram Client
    participant MH as Message Handler
    participant MW as Middleware Stack
    participant LLM as LLM (OpenRouter)
    participant Tools as Tools
    participant DB as SQLite
    participant RD as Renderer

    User->>TG: Send message (text/voice/photo)
    TG->>TG: Parse update, extract context
    TG->>MW: Set RequestContext (thread_id, user_id)
    
    alt Voice Message
        TG->>TG: Download audio, transcribe via Whisper
    else Photo / Media Group
        TG->>TG: Download photo(s), debounce media group
    end

    TG->>MH: on_message(text)
    MH->>MH: Build LangChain messages
    MH->>MW: agent.invoke()

    Note over MW,LLM: Middleware chain wraps every model call

    MW->>LLM: System prompt + user message
    LLM->>LLM: Reason about which tools to call
    LLM->>Tools: execute tool call(s)

    Note over Tools,DB: ErrorExposureMiddleware catches ValueError

    Tools->>DB: Query/mutate via SQLModel
    DB-->>Tools: Results
    Tools-->>LLM: Structured text result

    LLM->>LLM: Continue reasoning (tool results as context)
    LLM-->>MW: Final response text

    MW-->>MH: Response

    MH-->>TG: Response string
    TG->>RD: Render markdown → HTML
    RD-->>TG: Telegram-safe HTML
    TG->>User: Send message (split if >1000 chars)
```

## Component Architecture

```mermaid
flowchart TB
    subgraph "Application Layer"
        BP[bootstrap.py]
        BP --> AG[build_agent]
        BP --> TG[Telegram Client]
        BP --> SCH[Reminder Scheduler]
    end

    subgraph "Agent Core"
        AG --> ADM[create_deep_agent]
        ADM --> SP[System Prompt]
        ADM --> LLM[OpenRouter LLM]
        ADM --> MW[Middleware Chain]
        ADM --> SUB[Subagents]
        ADM --> SK[Skills / Instructions]
        ADM --> CP[LangGraph Checkpointer]
    end

    subgraph "Middleware Chain"
        MW --> FTM[FirstTimeSetup]
        MW --> DTM[Datetime Injection]
        MW --> EEM[ErrorExposure]
        MW --> PM[Preferences]
        MW --> SM[Status]
    end

    subgraph "Tool Layer"
        TL[26 Tools] --> SRV[Service Layer]
    end

    subgraph "Service Layer"
        SRV --> REP[Repository Layer]
        SRV --> GST[GST Calculator]
    end

    subgraph "Repository Layer"
        REP --> SQ[SQLModel Queries]
    end

    subgraph "Database"
        SQ --> SQLITE[(SQLite)]
        ALEM[Alembic] --> SQLITE
    end

    subgraph "Infrastructure"
        TG --> REN[TelegramRenderer]
        TG --> MED[Media Handler]
        TG --> RES[Response Sender]
        BP --> CTX[RequestContext]
        BP --> TEL[TelemetryLogger]
    end
```

## Module Dependency Graph

Modules are independent — they communicate only through the agent's tool list:

```mermaid
flowchart LR
    subgraph Core
        AG[Agent Core]
        MW[Middleware]
    end

    subgraph Modules
        INV[Inventory]
        PRE[Preferences]
        CUS[Customers]
        BIL[Billing]
        KHA[Khata]
        DOC[Documents]
        ANA[Analytics]
        REM[Reminders]
    end

    AG -->|tool calls| INV
    AG -->|tool calls| PRE
    AG -->|tool calls| CUS
    AG -->|tool calls| BIL
    AG -->|tool calls| KHA
    AG -->|tool calls| DOC
    AG -->|tool calls| ANA
    AG -->|tool calls| REM

    MW -.->|reads| PRE
    MW -.->|reads| REM

    BIL -.->|references| CUS
    BIL -.->|references| INV
    KHA -.->|references| CUS
    KHA -.->|references| BIL
    DOC -.->|references| BIL
    DOC -.->|references| PRE
    DOC -.->|references| CUS
    ANA -.->|references| BIL
    ANA -.->|references| INV
    ANA -.->|references| KHA

```

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **deepagents over custom state machine** | The LLM can chain arbitrary tool calls in one turn without pre-defined paths. Adding a new workflow doesn't require graph edits. |
| **SQLite over PostgreSQL** | Single-user shop, zero ops overhead. WAL mode handles concurrent reads; writes are serialized by the database. |
| **SQLModel over raw SQL** | Type-safe models, Alembic autogenerate, seamless migration from ORM to SQL when needed. |
| **Paise everywhere** | Avoids float rounding errors in currency calculations. ₹1 = 100 paise. |
| **Tool → Service → Repository** | Thin tools (input validation), services (business rules), repositories (data access). The LLM never sees a cursor. |
| **Middleware for injection** | Cross-cutting concerns (datetime, preferences, status) are transparent to tools and the LLM. |
| **`contextvars` for isolation** | Multi-chat safety without passing context through every function signature. |
