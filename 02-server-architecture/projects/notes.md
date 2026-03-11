# Notes — Server Architecture

## How I Think About It

A restaurant — the customer (client) talks to the waiter (Nginx), the waiter passes orders to the chef (Node.js), the chef cooks (processes) and sends back the food (response).

## Things That Clicked

- Nginx is the waiter, Node.js is the chef — they work together
- Reverse proxy = proxy for the server (opposite of VPN which is proxy for the client)
- Middleware is just extra steps before the route handler runs
- `next()` = "I'm done, pass it along"
- Not calling `next()` = request stops there (useful for auth blocking)

## Things to Remember

- `__dirname` = absolute path to current file's directory
- `path.join(__dirname, 'public', req.url)` builds the full file path dynamically
- `fs.readFile` err code `ENOENT` = file not found → 404
- `app.use()` = global middleware (runs on every request)
- Middleware with `(req, res, next)` — route handler with `(req, res)`

## Nginx Commands (WSL)

```bash
sudo service nginx start        # start nginx
sudo service nginx reload       # reload config after changes
sudo nginx -t                   # test config for syntax errors
sudo nvim /etc/nginx/sites-available/default  # edit config
```

## Nginx Reverse Proxy Config

```nginx
location / {
    proxy_pass http://localhost:3000;
}
```

## Questions I Had

- Why not just use Node.js for everything? → Node.js wasn't built to be a high-performance traffic handler. Nginx was.
- Why is it called "reverse" proxy? → Because it proxies on behalf of the server, not the client