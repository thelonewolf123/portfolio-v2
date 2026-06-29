---
title: The Case Against "Don't Reinvent the Wheel"
description: Why building complex systems from scratch is the best way to truly understand architecture
date: 2026-06-28
author: Harish Kumar
tags: ["Engineering", "Architecture", "Learning", "Platform Engineering"]
---

# The Case Against "Don't Reinvent the Wheel"

"Never reinvent the wheel" is the most toxic advice fed to developers today.

If you only ever glue together pre-packaged APIs and rely on managed platforms, your skills will plateau. Fast. You don't become a better architect by configuring someone else's black box.

## Why I Built Stardust

I didn't build Stardust because I actually need my own personal container provisioning engine.

I built it because it's a brutally hard problem to solve.

I wanted to learn exactly how to synchronize unpredictable async tasks across distributed systems, and figure out how to automatically scale infrastructure up and down based purely on real-time demand. You don't learn that by reading AWS whitepapers. You learn it by building it.

### What It Actually Takes Under the Hood

When you rip off the training wheels, here's what you find:

**Infrastructure as Code - 100% Pulumi**

Terraform ages poorly. Pulumi gives you real programming languages, testing capabilities, and better abstractions for complex cloud infrastructure.

**Async Microservices with RabbitMQ**

RabbitMQ-powered workers orchestrating builds and Spot instance recovery. This means:
- Decoupled services that can fail independently
- Automatic retry logic for failed jobs
- Dead letter queues for debugging

**Cloud Abstraction with Strategy Pattern**

AWS Fargate and ECS are powerful, but locking yourself into Jeff Bezos' ecosystem forever is shortsighted. Abstracting behind a Strategy pattern means you can migrate to GCP or Azure when economics change.

**Real-Time Everything**

Live browser SSH and streaming build logs via Redis pub/sub. When your users are watching their builds in real-time, you can't afford to poll every 5 seconds.

## The Documentation Problem

The software industry is getting really good at rewarding projects that look impressive instead of projects that are actually difficult to build.

A beautiful landing page. Fancy animations. A polished demo. Those get thousands of likes.

Meanwhile, someone spends months designing a distributed system, building infrastructure, solving concurrency issues, making deployments resilient, and thinking through countless architectural trade-offs—and all they have to show is a terminal window and an architecture diagram.

**The irony? The harder the engineering problem, the worse the demo usually is.**

That's why I'm investing time into documenting the projects I've already built. Not another landing page. Not another flashy demo. I want to document the engineering itself:

- Why the architecture looks the way it does
- The trade-offs behind every major decision
- How services communicate
- Deployment and infrastructure
- Scaling strategies
- What broke, what didn't, and what I'd do differently

## Reinventing the Wheel Isn't Waste

"Reinventing the wheel" isn't a waste of time. It's how you learn to build a better engine.

When you build something from scratch, you understand:
- Why the existing solutions work the way they do
- What trade-offs they made
- Where they fall short for your specific use case
- How to debug them when they break

I've seen too many engineers who can configure Kubernetes but couldn't tell you what a pod actually is. They can deploy to ECS but don't understand what happens when an instance crashes.

## The Real Cost of Not Reinventing

There's a hidden cost to always using managed solutions: you become dependent on their limitations.

When your "black box" doesn't support your use case, you're stuck. When it goes down, you go down. When pricing changes, you have no leverage.

Building things yourself means:
- You understand every failure mode
- You can optimize for your specific needs
- You're not held hostage by vendor pricing
- You can debug issues without praying to support tickets

## Conclusion

Stop letting others define the boundaries of your knowledge. Pick a hard problem. Build it yourself. Document what you learn.

The next time someone tells you not to reinvent the wheel, ask them what they've built from scratch lately. If they can't answer, they probably plateaued years ago.

---

*The best way to learn system design is to build systems that get designed.*
