## What is caching and why use it
- storing frequently accessed data in a fast storage layer (like **Redis**) so you don't have to fetch it from a slow source (like a database) everytime.

#### Why use caching?
1. **Speed**
- Database query: ~50-200ms
- Redis cache: ~1-5ms
- **Result:** 10-100x faster responses

1. **Reduce database load**
- Without cache: 1000 requests - 1000 DB queries
- With cache: 1000 requests = 1 DB query + 999 **cache hits**
- **Result:** Your DB doesn't get hammered

1. **Cost savings**
- Fewer DB queries = lower cloud bills (especially with services like AWS RDS, MongoDB Atlas)
- External API calls often have rate limits or cost per request

---
## Real-world example:

**Without caching:**
```
User 1 -> GET /products -> query DB -> return 200ms
User 2 -> GET /products -> query DB -> return 200ms
User 3 -> GET /products -> query DB -> return 200ms
...
1000 users = 1000 DB queries
```

**With caching**
```
User 1 -> GET /products -> query DB -> return 200ms
User 2 -> GET /products -> Redis cache -> return 2ms
User 3 -> GET /products -> Redis cache -> return 2ms
...
1000 users = 1 DB query + 999 cache hits
```