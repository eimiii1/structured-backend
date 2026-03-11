# 01 - HTTP Basics

## Overview

The foundation of the web. Every interaction between a client and server happens over HTTP — understanding it is the first step to understanding how the web works.

## Concepts Covered

### HTTP Request & Response Cycle

Every web interaction follows the same pattern:

1. Client sends a **request**
2. Server processes it
3. Server sends back a **response**

### HTTP Methods

|Method|Purpose|
|---|---|
|GET|Retrieve data|
|POST|Create data|
|PUT|Update data|
|DELETE|Remove data|

### Status Codes

|Code|Meaning|
|---|---|
|200|OK — Success|
|201|Created — Resource created|
|400|Bad Request|
|401|Unauthorized|
|404|Not Found|
|405|Method Not Allowed|
|500|Internal Server Error|

### Headers

Metadata attached to requests and responses. Examples:

- `Content-Type: application/json` — tells the receiver the format of the body
- `Authorization: token` — used for authentication

### Request Body

Data sent with POST/PUT requests. Usually JSON format.

## Projects

### 01 - raw-http-server

Built a basic HTTP server using Node.js's built-in `http` module with no frameworks. Handled requests and sent back JSON responses manually.

### 02 - http-inspector

Inspected incoming HTTP requests — method, headers, URL, and body.

### 03 - status-code-api

Built an API that returns different status codes based on the route requested.

## Key Takeaways

- HTTP is just a protocol — a set of rules for how clients and servers communicate
- Every request has a method, URL, headers, and optional body
- Every response has a status code, headers, and optional body
- Node.js `http` module lets you build a server from scratch