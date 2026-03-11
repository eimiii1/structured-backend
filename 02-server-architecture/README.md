# 02 - Server Architecture

## Overview

How servers are structured and organized internally. Not just "make a server" but how responsibilities are divided so each part only does what it's good at.

## Concepts Covered

### Web Server

A program that listens for incoming HTTP requests and responds to them. That's it.

```
Client → Request → Server → Response → Client
```

### Static vs Dynamic Content

- **Static** — same for everyone, doesn't change (HTML, CSS, images, JS files)
- **Dynamic** — generated on the spot based on the request (user data, API responses)

### Reverse Proxy

A server that sits in front of your backend server and forwards requests to it.

```
Client → Nginx (port 80) → Node.js (port 3000)
```

The client never talks to Node.js directly. Nginx acts as the middleman.

**Regular proxy** = acts on behalf of the client (e.g. VPN) **Reverse proxy** = acts on behalf of the server (e.g. Nginx)

#### Waiter Analogy

- Customer = Client
- Waiter = Nginx
- Chef = Node.js

The customer never walks into the kitchen. The waiter handles everything out front.

#### Why Use a Reverse Proxy?

- Hides your Node.js server from direct exposure
- Serves static files faster without bothering Node.js
- Handles SSL/HTTPS
- Load balancing across multiple servers
- Security filtering

### Middleware

Functions that run between the request and the route handler.

```
Request → Middleware → Middleware → Route Handler → Response
```

Each middleware has access to `req`, `res`, and `next()`. Calling `next()` passes the request to the next step. Not calling it stops the request there.

**Types:**

- `(req, res, next)` → middleware
- `(req, res)` → route handler
- `(err, req, res, next)` → error handling middleware

**Common uses:**

- Logging — record every request
- Auth — block unauthorized requests
- JSON parsing — `express.json()` parses req.body
- CORS, rate limiting, validation

## Projects

### 01 - Static File Server

Built a Node.js server that serves files from a `public/` folder based on `req.url`. Uses `http`, `fs`, and `path` modules.

### 02 - Reverse Proxy

Configured Nginx on WSL to forward requests from port 80 to a Node.js server on port 3000.

### 03 - Middleware Demo

Built an Express app with three middleware functions: logger, auth checker, and JSON parser.

## Key Takeaways

- Web servers just listen and respond — that's the core
- Nginx and Node.js work together, not as replacements for each other
- Middleware is just a chain of functions — order matters
- `next()` is what keeps the chain moving