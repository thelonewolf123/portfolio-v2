---
title: Observability in Production
description: How implementing distributed tracing and real-time mail tracking reduced latency from 15 minutes to 5 seconds at Klenty.
date: 2026-02-20
author: Harish Kumar
tags: ["Observability", "Distributed Tracing", "Performance", "Infrastructure"]
---

# Observability in Production: From Zipkin Tracing to 5-Second Latency

At Klenty, I inherited a mail tracking system where engineers would SSH into production to debug issues. Email delivery status updates took up to 15 minutes to reflect — making it useless for real-time sales workflows. Here's how we rebuilt observability from the ground up.

## The Problem

Klenty's sales engagement platform sends millions of emails. Each email goes through: CRM → delivery service → SMTP → open/click tracking → webhook callback → database update. When something broke, finding where meant:

1. Checking application logs (scattered across servers)
2. Looking at database state
3. Checking SMTP provider dashboards
4. SSHing into production (yes, really)

This took hours. We needed distributed tracing.

## Implementing Zipkin Distributed Tracing

We instrumented every service to emit trace data:

```typescript
// Middleware to create/hydrate trace context
app.use((req, res, next) => {
  const traceId = req.headers["x-trace-id"] || crypto.randomUUID();
  const spanId = crypto.randomUUID();

  req.trace = { traceId, spanId, parentSpanId: req.headers["x-span-id"] };

  // Propagate to downstream services
  req.headers["x-trace-id"] = traceId;
  req.headers["x-span-id"] = spanId;

  next();
});
```

Each service — mail sender, webhook handler, tracking pixel server — would report spans to Zipkin. For the first time, we could see the full lifecycle of a single email:

```
POST /send           → 120ms   (API)
Queue delivery       → 300ms   (Bull/Redis)
SMTP send            → 2.1s    (AWS SES)
Open tracking pixel  → 45ms    (Express)
Webhook receive      → 80ms    (Express)
Database write       → 15ms    (MongoDB)
Total                → ~2.7s
```

The bottleneck was immediately obvious: the delay wasn't in processing — it was in the polling interval between services.

## The Real-Time Mail Tracking System

The old system polled the database every 5 minutes for status changes. We replaced it with a stream-based approach:

### Before (Polling)
```
Mail sent → DB write → (wait 5 min) → Poll → Check → Update UI
```

### After (Streaming)
```
Mail sent → DB write → Change Stream → Redis Pub/Sub → WebSocket → UI update in <5s
```

```typescript
// MongoDB change stream → real-time updates
const changeStream = db.collection("emails").watch([
  { $match: { "fullDocument.userId": { $exists: true } } }
]);

changeStream.on("change", (change) => {
  if (change.operationType === "update") {
    // Push to connected clients via Redis Pub/Sub
    redis.publish("mail:updates", JSON.stringify({
      userId: change.fullDocument.userId,
      emailId: change.documentKey._id,
      status: change.updateDescription.updatedFields.status,
    }));
  }
});
```

### Result: Latency dropped from 15 minutes to 5 seconds.

## MongoDB Request Attribution

Next, we needed to know which user action caused which database query. We built a lightweight attribution system:

```typescript
// Tag every query with request context
const session = db.startSession();
session.startTransaction();

const attribution = {
  requestId: req.id,
  userId: req.user.id,
  action: req.route.path,
  timestamp: new Date(),
};

await db.collection("emails").updateOne(
  { _id: emailId },
  { $set: { status: "opened", _attribution: attribution } },
  { session }
);
```

This let us correlate slow queries to specific user actions and API endpoints — no more guessing.

## Slow Query Detection Pipeline

We built a background pipeline that:

1. Reads MongoDB slow query logs (queries > 100ms)
2. Groups by collection and operation type
3. Cross-references with request attribution data
4. Sends alerts to Slack with the originating endpoint and user context

```typescript
// Simplified slow query detector
async function detectSlowQueries() {
  const slowQueries = await db.collection("system.profile")
    .find({ millis: { $gt: 100 } })
    .sort({ millis: -1 })
    .limit(50)
    .toArray();

  for (const query of slowQueries) {
    const attribution = query.query._attribution;
    if (attribution) {
      await notifySlack({
        text: `Slow query: ${query.millis}ms\n` +
              `Endpoint: ${attribution.action}\n` +
              `User: ${attribution.userId}\n` +
              `Collection: ${query.ns}`,
      });
    }
  }
}
```

## Key Takeaways

1. **Distributed tracing is not optional** for a microservice architecture. Start with Zipkin or Jaeger before you need it.
2. **Change streams beat polling** every time. MongoDB change streams + Redis Pub/Sub eliminated our 15-minute delay.
3. **Attribute every query**. You can't optimize what you can't identify. Tagging queries with request context makes debugging trivial.
4. **Alert on symptoms, not causes**. Slow query detection caught issues before customers reported them.

The result was a system where any engineer could open a Zipkin trace, see exactly where an email was in the pipeline, and identify bottlenecks — without touching a production server.
