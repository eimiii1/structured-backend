# Cache-Aside Pattern (Lazy Loading)

## What is Cache-Aside?

The most common caching pattern. You check the cache first, and if the data isn't there (cache miss), you fetch it from the database and cache it for next time.

## The Flow
```
User requests data
    ↓
Check cache first
    ↓
Is data in cache?
    ├─ YES → Return cached data (Cache HIT)
    └─ NO  → Query database
              ↓
              Cache the result
              ↓
              Return data (Cache MISS)
```

## Code Example
```javascript
app.get('/articles', async (req, res) => {
    // Step 1: Check cache first
    const cacheData = await client.get('articles')
    
    // Step 2: If found, return it (Cache HIT)
    if (cacheData) {
        return res.json({
            status: 200,
            articles: JSON.parse(cacheData)
        })
    }
    
    // Step 3: Cache MISS - query database
    const articles = await Article.find()
    
    // Step 4: Cache the result for next time
    await client.setEx('articles', 60, JSON.stringify(articles))
    
    // Step 5: Return the data
    res.json({
        status: 200,
        articles
    })
})
```

## Why It's Called "Cache-Aside"

- You load data **only when it's requested** (lazy loading)
- You "set it aside" in the cache for future use
- The cache is **separate** from the database (aside = off to the side)

## When to Use Cache-Aside

- GET requests (read operations)
- Data that doesn't change often
- Expensive database queries
- High-traffic endpoints

## Advantages

- Simple to implement
- Works with any database
- Cache only stores data that's actually requested
- Less memory usage (only cache what's needed)

## Disadvantages

- First request is always slow (cache miss)
- Cache can become stale if data changes and cache isn't invalidated