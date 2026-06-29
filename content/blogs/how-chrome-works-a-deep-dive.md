---
title: How Chrome Works: A Deep Dive
description: Inside look at modern browser architecture - processes, threads, and the journey of a URL
date: 2023-08-16
author: Harish Kumar
tags: ["Browser", "Chrome", "Architecture", "Deep Dive"]
---

# How Chrome Works: A Deep Dive

How does Chrome work? Let me take you inside one of the most complex software systems ever built.

## The Four Processes

A modern browser runs four main processes:

### Browser Process
Controls address bar, bookmarks, back and forward buttons, etc. It's the main process that coordinates everything.

### Renderer Process
Controls anything inside of a tab where a website is displayed. Each tab typically gets its own renderer process for isolation.

### GPU Process
Handles GPU tasks—decoding images, accelerating 3D graphics, compositing layers.

### Plugin Process
Controls the plugins used by websites (Flash, PDF viewers, etc.).

## Servicification

When Chrome runs on powerful hardware, it may split each service in the browser process into different threads. This is called **Servicification**.

For example:
- Network service runs in its own thread
- UI service runs separately
- Storage service is isolated

This improves stability and security.

## The Journey of a URL

Let's go through what happens when you enter a URL in Chrome.

### Step 1: URL Entry
The user enters a URL into the browser. This is handled by the **UI thread**.

### Step 2: Network Call
When the user hits enter, the **UI thread** initiates a network call to get the site content. The **network thread** handles the actual communication.

### Steps 3-4: Network Protocols
The network thread goes through appropriate network protocols (TCP/IP, TLS, HTTP) and retrieves the content.

### Step 5: Content Inspection
When the network thread receives responses, it looks at the first few bytes of the stream:
- If it's an HTML file → pass to renderer process
- If it's a PDF → hand to PDF plugin
- If it's an image → hand to GPU process

### Steps 6-9: IPC and Navigation Commit
An IPC (Inter-Process Communication) is sent from the browser process to the renderer process to commit the navigation.

A data pipe is established between the network thread and the renderer process so the renderer can receive data.

Once the browser process confirms the commit, navigation is complete and the document loading phase begins.

## Process Model

Chrome assigns each tab a renderer process by default. But why?

### Why Process Per Tab?

**Isolation.** If one tab crashes, it doesn't take down all your other tabs.

**Security.** A malicious website can't read data from another website's renderer memory.

**Stability.** A memory leak in one tab doesn't consume memory from all tabs.

## Multi-Process Architecture Benefits

### Memory Isolation
Each process has its own memory space. A memory leak is contained.

### Security Isolation
Sites from different origins are sandboxed from each other.

### Performance Isolation
Heavy JavaScript in one tab doesn't freeze the entire browser.

### Stability
A crash in Flash or a plugin doesn't crash Chrome itself.

## The Render Process Internals

The renderer process is where the magic happens:

```
Renderer Process
├── Main Thread (JS, DOM, layout)
├── Worker Thread (Web Workers)
├── Compositor Thread (scroll, animations)
└── GPU Thread (WebGL, image decoding)
```

## Key Takeaways

1. Chrome is not a single application—it's a multi-process operating system
2. Each process is sandboxed for security and stability
3. The browser process acts as the coordinator
4. Network thread handles all I/O asynchronously
5. IPC is the communication backbone between processes

---

## Quick Review Questions

- **Why does Chrome assign each tab a renderer process?** For isolation—security, stability, and memory management.

- **What handles the actual network request?** The network thread inside the browser process.

- **What is Servicification?** Splitting browser services into separate threads or processes for better resource management.

---

*Understanding how browsers work helps us write better web applications. Know your tools.*

---

**Reference:** [Inside look at modern web browser](https://developer.chrome.com/blog/inside-browser-part1) by the Chrome team
