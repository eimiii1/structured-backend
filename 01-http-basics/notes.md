# Notes — HTTP Basics

## How I Think About It

HTTP is just a conversation between two people — the client asks, the server answers. Every single thing on the web is just that, over and over.

## Things That Clicked

- `req` = what the client is asking
- `res` = what the server answers with
- Status codes are just the server's way of saying "here's what happened"
- Headers are like the envelope around the message — they describe what's inside

## Things to Remember

- `res.end()` only accepts strings or buffers, not objects — use `JSON.stringify()` first
- `Content-Type: application/json` tells the client to expect JSON
- GET requests don't have a body — data goes in the URL
- POST/PUT requests have a body — data goes there

## Commands Used

```bash
node server.js          # run the server
curl http://localhost:3000  # test in terminal
```

## Questions I Had

- Why use `http` module instead of just Express? → To understand what Express is actually doing under the hood