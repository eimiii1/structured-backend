# Redis Basics

## What is Redis?
In-Memory key-value storage. Super fast because data lives in RAM, not disk.

## Connection
```js
import { createClient } from 'redis'

const client = createClient()
await client.connect()
```

## Core Commands
- `client.get(key)` - retrieve value (return null if not found)
- `client.set(key, value, ttl)` - store with expiration
- `client.del(key)` - delete/invalidate cache which also known as **Cache Invalidation**

## Important
Redis stores strings only -> use `JSON.stringify()` and `JSON.parse()`