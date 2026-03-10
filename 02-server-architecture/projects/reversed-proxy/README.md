# 02 - Reverse Proxy with Nginx

## Concept

A **reverse proxy** is a server that sits in front of your backend server and forwards client requests to it.

```
Client → Nginx (port 80) → Node.js (port 3000)
```

The client never talks to Node.js directly — it only talks to Nginx. Nginx acts as the middleman.

This is different from a **regular proxy** which acts on behalf of the client. A reverse proxy acts on behalf of the **server**.

### Waiter Analogy

- **Client** = Customer
- **Nginx** = Waiter
- **Node.js** = Chef

The customer never walks into the kitchen. The waiter takes the order, passes it to the chef, and brings back the response.

## Why Use a Reverse Proxy?

- **Shields your Node.js server** from direct exposure to the internet
- **Handles static files** faster without bothering Node.js
- **Manages traffic** — can handle many requests at once
- **SSL termination** — handles HTTPS so Node.js doesn't have to
- **Load balancing** — can distribute requests across multiple servers

## Setup

### 1. Install Nginx (Ubuntu/WSL)

```bash
sudo apt update && sudo apt install nginx -y
sudo service nginx start
```

### 2. Configure Nginx

Edit the default config:

```bash
sudo nvim /etc/nginx/sites-available/default
```

Replace the `location /` block with:

```nginx
location / {
    proxy_pass http://localhost:3000;
}
```

### 3. Reload Nginx

```bash
sudo service nginx reload
```

### 4. Run your Node.js server

```bash
node server.js
```

### 5. Test it

```bash
curl http://localhost/index.html
```

Nginx receives the request on port 80 and forwards it to your Node.js server on port 3000.

## What I Learned

- A reverse proxy acts on behalf of the server, not the client
- Nginx sits in front of Node.js and handles incoming requests first
- The client has no idea Node.js exists — it only sees Nginx
- This is a core pattern in real-world production deployments