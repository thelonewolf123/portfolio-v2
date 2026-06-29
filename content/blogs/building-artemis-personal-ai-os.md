---
title: Building Artemis: A Personal AI OS
description: How I built an AI assistant that learns, remembers, and evolves with you over time
date: 2025-11-29
author: Harish Kumar
tags: ["AI", "Personal Assistant", "Artemis", "n8n", "Productivity"]
---

# Building Artemis: A Personal AI OS

Artemis started as a simple Telegram bot to help me plan my day. It evolved into something I never expected—a personal AI assistant that learns, remembers, and grows with you.

## The Problem with Single-Bucket Memory

Most AI assistants have one giant bucket of memory. Some is in context. Some is in vector DB. Nothing is truly structured or isolated.

This makes it tough for the AI to deeply understand a specific part of your life—like my eating habits vs. my workouts vs. my financial planning.

## Skill Matrix: A New Architecture

I built something new. Still figuring out the name—Skill Matrix or Skill Cortex—but the idea is solid.

### What Is Skill Matrix?

It's a system that lets the AI create new skills, each with their own mini-database and structured data model.

Think of each skill as a small, self-contained "brain module" that knows how to store, process, and reason about one area of your life.

### Why This Is a Game-Changer

Each skill can:
- Have its own fields and data schema
- Store structured entries (not just embeddings or free text)
- Integrate with other skills
- Build on top of existing automations

### Example Skills

**Diet Tracking Skill** – Reminds me morning/afternoon/evening to record my meals

**Exercise Skill** – Uses my stored weight + eating patterns to dynamically plan workouts

Suddenly, instead of one overloaded memory blob, I have a scalable system where the AI can reason across skills, combine insights, and make decisions with actual context.

## How It Actually Works

Artemis can help me:
- Eat better and track my nutrition
- Plan workouts based on yesterday's meals
- Get suggestions when I miss key nutrients
- Practice with a LeetCode question every alternate day
- Track my expenses and actually see where my money goes

Could I use separate apps for all this? Absolutely. Some of them would even do a better job individually.

But here's the real problem:

**Discipline is hard. Managing multiple apps is harder. And every extra app increases cognitive load.**

## The Key Insight

The goal of a personal assistant shouldn't be to let users slack off.

It should enable them to become better.

## Scaling from Prototype to Production

For Artemis, the first version of the reminder system was literally:
> "Run a scheduler every minute and check who has a reminder."

Perfect for a weekend build. Terrible for scale.

### Lessons Learned

1. **Build fast first, but isolate the logic** — Your future self will thank you when you refactor.

2. **Use queues for anything time-based or asynchronous** — RabbitMQ's delayed queue let me turn a naive loop into a precise, scalable reminder engine.

3. **Measure before optimizing** — I didn't switch to RabbitMQ until I felt the original approach slowing down.

4. **Replace pieces one at a time** — A prototype is a living organism—if you change everything at once, it breaks.

5. **Keep the experience consistent** — Users should feel improvements, not disruption.

## The Stack

Artemis is powered by:
- **n8n** for workflow automation
- **OpenAI & OpenRouter** for LLM capabilities
- **Telegram** for the interface
- **Google** for calendar and email integration
- **RabbitMQ** for reliable message queuing
- **Vector DB** for long-term memory

## What Makes It Special

Notes are woven across chat, reminders, and tasks—quietly shaping how Artemis understands and interacts with me.

I can drop a quick voice note about how I like things phrased, and from that moment on, Artemis adapts—no prompt edits, no reconfiguration.

It learns my tone, timing, and habits—growing with me over time.

**Sometimes it's not the grand innovations that change everything—it's the small, human touches that make technology feel truly alive.**

---

*Artemis is still growing, and every upgrade teaches me something new about designing assistants that feel human but scale like software.*
