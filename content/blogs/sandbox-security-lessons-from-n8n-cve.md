---
title: Sandbox Security: Lessons from the n8n CVE
description: Why language sandboxes aren't security boundaries and how to properly isolate code execution
date: 2026-01-19
author: Harish Kumar
tags: ["Security", "Sandboxing", "LLM Security", "System Design", "DevSecOps"]
---

# Sandbox Security: Lessons from the n8n CVE

Pyodide is not a sandbox. n8n just proved it.

The recent n8n CVE-2025-68698 (CVSS 9.9) wasn't a clever hack. It was an architectural failure.

## What Happened

n8n used Pyodide to run Python safely. But Pyodide runs inside Node.js.

That means:
- Same process
- Same memory
- Same privileges

Once attackers escaped the Pyodide layer, they were effectively executing code as the n8n process itself.

**Language sandbox ≠ Security boundary.**

## The Real Problem: Blacklist Security

Blocking "dangerous" functions doesn't work. You'll always miss one.

Escaping a blacklist is easy. Escaping a whitelist system is hard.

This is why I built AEGIS the way I did.

## How AEGIS Handles Code Execution

When designing AEGIS, I assumed:

> Any system that executes code will be attacked.

So:

- Code runs in **NSJail** (real process isolation)
- **Default-deny networking** via iptables
- No internet, no lateral movement
- Only explicit tool access via localhost

**If it's not allowed, it doesn't exist.**

## The Key Principle

If untrusted code runs:
- In your process
- In your runtime
- With shared memory

...it's not sandboxed—no matter what you call it.

## What Real Sandboxing Looks Like

### Process Isolation

```bash
# NSJail configuration example
nsjail -m -R /bin -R /lib -R /lib64 \
       --disable_proc \
       --enforce_fd_limits \
       --iface_no_lo \
       -p /var/jail
```

### Network Isolation

```bash
# iptables default-deny
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP
iptables -A OUTPUT -m owner --uid-owner jail -j ACCEPT
```

### Filesystem Restrictions

- Read-only system directories
- No access to user home directories
- Temp files in isolated tmpfs
- Seccomp-bpf for syscalls

## The Spectrum of Isolation

| Level | Example | Security |
|-------|---------|----------|
| Language VM | Pyodide, WASM | None (shared process) |
| Containers | Docker | Partial (same kernel) |
| VMs | Firecracker | Strong |
| Hardware | Separate machines | Strongest |

## Takeaways

1. **Never trust language-level isolation** - They're optimizations, not security boundaries
2. **Default-deny networking** - Block everything, allow explicitly
3. **Process isolation** - Use proper jail technology like NSJail, Firecracker
4. **Defense in depth** - Multiple layers of security
5. **Assume breach** - Design as if attacker already has code execution

**Sandboxing is infrastructure, not a library choice.**

When you're building systems that execute untrusted code, security isn't a feature—it's the foundation.
