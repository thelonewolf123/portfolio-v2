---
title: Real AI Coding Workflows: Beyond Figma Dumps
description: How to structure AI coding agents with micro-component prompting and proper guidelines
date: 2026-05-28
author: Harish Kumar
tags: ["AI", "Coding", "Workflow", "Prompt Engineering"]
---

# Real AI Coding Workflows: Beyond Figma Dumps

Stop feeding entire Figma files to your AI coding agents. You're burning tokens and ruining your codebase.

Like many, I initially treated AI coding tools as magic wands. I'd connect the Figma MCP, point the agent to my data sources, feed it a full design file, and tell it to build.

The result? A massive 1-2 million token context burn per run. The AI constantly messed up my project-specific API structures, failed to reuse existing components, and generated code that stood out like a sore thumb.

I briefly reverted to writing 80% of the code myself, creating hard-coded skeletons, and only using AI for data integration. But that was painfully slow.

I realized the problem wasn't the AI—it was my workflow.

## The 400-Line Master Guideline

Instead of letting the agent blindly explore the whole project to understand the context, I used a heavy model (Sonnet/Opus) to analyze the project once.

I had it generate a strict guideline detailing:
- How components should be structured
- Where imports live
- How our APIs are handled

Now, the agent only reads this doc. Massive token savings, and the AI stays consistent with our patterns.

## Micro-Component Prompting

I stopped feeding the agent entire screens. I put my architect hat on and broke down the UI logically into distinct files:

1. **Define the exact props and placement** for each component
2. **Let AI build isolated components** one at a time
3. **Stitch them together** manually

This gives you:
- Clean, reusable components
- Consistent design language
- AI that doesn't hallucinate UI patterns

## The Automated "Add Icon" Skill

AI is notoriously bad at handling icons—hallucinating them or duplicating SVGs. Doing it manually took 1-2 minutes per icon.

So I built a custom automated skill:

### Script 1: Figma MCP Integration
Uses Figma MCP to extract icon metadata and SVG paths from existing components.

### Script 2: SVG Optimization
Cleans up the SVG, removes Figma-specific attributes, and standardizes the format.

### Script 3: Project Integration
Adds the icon to the correct location in the codebase with proper naming conventions.

**Total time per icon: 3 seconds.**

## The Core Principle

```
Large context = Low signal
Small, targeted context = High signal
```

Instead of explaining your entire codebase to AI, explain exactly what each piece needs to do.

## What Doesn't Work

❌ Feeding entire Figma files
❌ Pointing AI at a repo and saying "build this"
❌ Letting the model explore freely
❌ No boundaries or constraints

## What Works

✅ Micro-component prompting
✅ Strict coding guidelines
✅ Automated skills for repetitive tasks
✅ Clear boundaries and expectations
✅ Token-efficient context

## The Meta-Lesson

The bottleneck in AI-assisted development isn't the AI. It's the workflow around it.

Build systems that help AI help you:
- Structured guidelines
- Clean component boundaries
- Automated skills for low-level tasks
- Proper context management

AI coding tools are only as good as the systems you build around them.
