---
title: Building Real-Time Systems with WebSockets
description: Architecture decisions, scaling strategies, and lessons learned from building a real-time watch party platform serving 7,000+ users.
date: 2026-03-15
author: Harish Kumar
tags: ["WebSockets", "React Native", "WebRTC", "Architecture"]
---

# Building Real-Time Systems with WebSockets

Building a real-time application that works reliably at scale is hard. I learned this firsthand while building WatchWithMe — a watch party platform that grew from zero to 7,000+ users with paying customers. Here's what I learned about WebSocket architecture, latency management, and scaling real-time systems.

## The Core Challenge

WatchWithMe lets users watch videos together in real-time — play, pause, seek, and chat are synchronized across all participants. The naive approach is simple: broadcast every action via WebSockets. The reality is far more complex.

### Key constraints we faced:

- **Latency drift**: Two clients playing the same video drift apart within seconds
- **Connection reliability**: Mobile networks drop WebSocket connections frequently
- **State consistency**: When a user pauses, every participant must pause at the exact same frame
- **Scaling**: WebSocket connections are stateful — horizontal scaling isn't trivial

## Architecture

We settled on a hybrid architecture:

```
Client → WebSocket (real-time events) → Redis Pub/Sub → Room Server → Broadcast
Client → REST API (auth, room CRUD) → Load Balancer → API Servers
```

### WebSocket Layer

Each client establishes a persistent WebSocket connection to a room server. The server maintains an in-memory map of room ID → connected clients. When a user performs an action (play, pause, seek), the server broadcasts it to all other clients in the same room.

### Redis Pub/Sub for Horizontal Scaling

A single server can only handle so many concurrent WebSocket connections. To scale horizontally, we used Redis Pub/Sub. When server A receives an event, it publishes to Redis, which fans out to all subscribed servers. Each server then broadcasts to its local clients.

```typescript
// Simplified room broadcast
async function broadcastToRoom(roomId: string, event: ServerEvent) {
  // Publish to Redis for cross-server fan-out
  await redis.publish(`room:${roomId}`, JSON.stringify(event));

  // Also broadcast to local clients
  const clients = roomClients.get(roomId) || [];
  for (const ws of clients) {
    ws.send(JSON.stringify(event));
  }
}
```

### Solving Drift with Heartbeats

The biggest technical challenge was keeping all participants in sync. We implemented a leader-based sync:

1. The room creator is the "sync leader" (elected on creation)
2. Every 5 seconds, the leader broadcasts its current playback position
3. Clients adjust to match the leader's timestamp
4. If the leader disconnects, a new leader is elected

This approach kept drift under 200ms even with 50+ participants.

## Lessons Learned

### 1. Connection Resilience is Everything

Mobile networks are unpredictable. We implemented exponential backoff reconnection with state recovery:

```typescript
function connectWithBackoff(roomId: string, attempt = 0) {
  const ws = new WebSocket(`wss://api.watchwithme.in/ws?roomId=${roomId}`);

  ws.onclose = () => {
    const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
    setTimeout(() => connectWithBackoff(roomId, attempt + 1), delay);
  };

  ws.onopen = () => {
    // Re-sync state with server on reconnect
    ws.send(JSON.stringify({ type: "SYNC_REQUEST" }));
  };
}
```

### 2. Monitor Everything

We tracked: connection lifetime, reconnection rate, message latency, room size distribution. A simple dashboard built with Server-Sent Events gave us real-time visibility into the system health.

### 3. Graceful Degradation

When WebSockets fail, fall back to polling. When the sync leader disconnects, elect a new one. When the server is under load, prioritize audio/video sync over chat messages.

## Results

- **7,000+ users** onboarded with zero data loss incidents
- **<200ms drift** across participants
- **<500ms reconnection** with full state recovery
- **Payments integrated** without affecting real-time performance

Building real-time systems forces you to think about edge cases that don't exist in request-response architectures. Connection drops, state conflicts, and latency spikes become first-class concerns. But when it works, the experience is magical.
