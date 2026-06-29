---
title: From P2P to LiveKit: Scaling WatchWithMe
description: How we migrated from peer-to-peer WebRTC to an SFU architecture and what we learned about infrastructure trade-offs
date: 2025-11-04
author: Harish Kumar
tags: ["Architecture", "WebRTC", "Scaling", "LiveKit", "WatchWithMe"]
---

# From P2P to LiveKit: Scaling WatchWithMe

We spent 3.5 months building a P2P system, and then decided to throw it away.

When we started WatchWithMe, the goal was simple: let people watch together in real-time, across the world.

## The P2P Experiment

To save infra costs, we went with peer-to-peer (P2P). We used libraries like simple-peer and others. They worked for small sessions, but real users exposed the cracks:
- Random drops
- Broken ICE negotiations
- Peers stuck behind NATs

So we went all in and built our own P2P library from scratch.

### What We Built

Custom seeding, peer discovery, DHT-style routing, in-browser relays, optimized data channels—basically a BitTorrent-inspired WebRTC network.

It took nearly 2 months to build from scratch and worked beautifully… in perfect conditions.

### The Fatal Flaw

P2P depends completely on client networks. One weak connection and the whole session broke.

Fine for file sharing. A disaster for real-time video and audio.

We spent another 1.5 months debugging: ICE issues, latency spikes, renegotiations—fixing one thing and breaking two more.

We were losing users, time, and sanity.

## The Cloudflare Workers Experiment

We tried Cloudflare Workers for signaling—super fast, globally distributed—but too costly.

We had to keep WatchWithMe free for up to 1,000–1,500 users, so it wasn't sustainable.

## The Pivot: LiveKit SFU

Finally, we made the big pivot → LiveKit, an open-source WebRTC SFU.

### What Is an SFU?

An SFU (Selective Forwarding Unit) is a media server that receives media from participants and forwards it to other participants, without mixing or processing it.

Unlike P2P where each participant connects to every other participant (mesh), an SFU centralizes media distribution:

- Participants send to the SFU
- SFU forwards to all other participants
- Linear scaling instead of exponential

### The Migration

The migration took time—we moved component by component while users stayed live—but it paid off:

✅ **Predictable latency**
✅ **Stable sessions**
✅ **No random drops**

We began with one self-hosted server, but as we grew to 4,000+ users across continents, we moved to LiveKit Cloud for intercontinental reliability.

## MVP Philosophy: Keep It Simple

When building an MVP, simplicity should be your mantra. It's tempting to over-engineer with fancy tech—serverless functions, S3 buckets, message queues, intricate CI/CD pipelines.

But is all of that really necessary for an MVP?

For WatchWithMe, I went with **Coolify**—a no-fuss deployment tool that lets you focus on building a product users love, not wrestling with infrastructure.

### MVP Lessons

1. **Complexity kills startups** — Every abstraction is a debt you're taking on
2. **Users don't care about your architecture** — They care about watching together
3. **Start simple, scale when needed** — Premature optimization is the root of all evil
4. **Know when to pivot** — clinging to a failing approach costs more than changing

## The Real Cost of "Cool" Infrastructure

There's a hidden cost to choosing infrastructure based on what's impressive rather than what's necessary:

- More things to debug
- More services to monitor
- More ways for things to break
- More money to maintain

The best infrastructure is the one your users never notice.

---

*Yes, there were ups and downs. We lost users along the way. But today, WatchWithMe runs on a rock-solid, scalable infra—and it feels amazing.*
