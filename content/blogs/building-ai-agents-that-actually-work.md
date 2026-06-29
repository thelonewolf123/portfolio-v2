---
title: Building AI Agents That Actually Work
description: Tool composition, closed feedback loops, and making AI an engineer you empower
date: 2026-04-16
author: Harish Kumar
tags: ["AI", "Agents", "LLM", "System Design"]
---

# Building AI Agents That Actually Work

Most people use AI to do their work faster. I use AI to build systems that make work get done better.

That's the difference.

## The Fundamental Shift: Suggesting vs Executing

AI is not just a chatbot you prompt. It becomes powerful when you give it:

- Access to real environments
- Tools to execute and observe
- Context beyond just text
- A closed-ended feedback loop

That last part is critical.

If AI can only suggest, it's guessing.
If AI can execute → observe → adjust → retry, it starts behaving like an engineer.

## Layered Tool Selection: Don't Give the Model the Whole Dictionary

Most people dump all their tools into one giant system prompt and wonder why the model becomes slow, expensive, and borderline stupid.

If you only need the meaning of one word, why read the whole dictionary?

### The Solution: Layered Tool Selection

```typescript
all_tools = [sum, product, weather, search]
query = "25 + 37?"

relevant = validator_llm.select(query, from=all_tools)
agent = grok_llm.bind_tools(relevant)
```

A cheap model filters the tools. A powerful model uses only what's relevant. Result? Faster, cheaper, smarter agents.

### The Payoff

- Less context bloat
- Higher accuracy
- Lower cost
- No more "dumb agent" moments

Trim the noise. Give your model only what it needs.

**Context is a feature. Not a dump yard.**

## ComputeFlow: Thinking in Code

One of the biggest headaches with AI agents is handling large datasets. When you ask "How much did I spend on tea this month?", should it really shove 10,000 rows into the LLM context?

Absolutely not.

With ComputeFlow, the agent now writes small JavaScript snippets on the fly:

1. **Query**: "tea expenses"
2. **Agent generates**:
   - A tight SQL filter
   - A tiny JS reducer
3. **Output**: One clean number — zero context bloat

### Why This Is a Game-Changer

- Handles huge datasets instantly
- Token usage drops to almost nothing
- Answers are deterministic, not "LLM vibes"
- The AI literally codes its way through data instead of hallucinating

It's like giving your assistant a proper compute engine instead of asking it to do long division in its head.

**Think with the model. Compute outside it.**

## Closed Feedback Loops: A Real Example

I built a Python code sandbox. Worked perfectly on my local machine. In production? Silent crashes. No errors. Nothing obvious.

Instead of guessing, I built a CLI tool—an automated SSH layer:

- Accepts bash commands
- Runs them inside the VM
- Returns outputs

Then I plugged AI into it with:

- Access to my code
- Access to the VM
- The ability to run commands and see results

Now the loop was closed: AI executes → sees output → refines approach → executes again.

It figured out the issue:

- My local machine → ARM (M1 Mac)
- Production → x86

**Architecture mismatch.**

No stack trace pointed to it. AI didn't just "answer"—it investigated.

## The Right Way to Use AI

Not:
> "Write me code"

But:
> "Here's the system, here's the tooling access, go figure it out"

The real leverage comes when you:

- Build tools for AI
- Create closed feedback loops
- Give it execution capability
- Let it reason across environments

## What This Means for Engineering

Stop treating AI like a shortcut. Start treating it like an engineer you empower.

The real leverage comes from clarity, not automation. AI doesn't replace thinking—it amplifies it.

When you give AI tools, context, and execution capability, it stops being a chatbot and becomes a force multiplier.

**Use AI for execution, not thinking.**

Because the real leverage comes from clarity, not automation.
