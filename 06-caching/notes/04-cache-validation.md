# Cache Invalidation

## The Problem

When you update or delete data in the database, the cached data becomes **stale** (outdated).

**Example:**
```
1. Database has 5 products → Cache stores 5 products
2. POST adds 6th product → Database now has 6 products
3. Cache still has 5 products (WRONG!)
4. User requests GET /products → Gets cached 5 products (outdated)
```

## The Solution: Invalidate Cache on Write Operations

When you modify data (POST/PUT/DELETE), **delete the cache** so the next request fetches fresh data.
```javascript
app.post('/products', async (req, res) => {
    // Add new product to database
    const newProduct = await Product.create(req.body)
    
    // Invalidate cache
    await client.del('products')
    
    res.status(201).json({ product: newProduct })
})
```

## When to Invalidate

### POST (Create)
- Invalidate **list cache** only
- Individual item cache doesn't exist yet
```javascript
await client.del('products')  // List changed
```

### PUT (Update)
- Invalidate **both list and specific item cache**
- List might show updated fields (like title)
- Specific item has old data
```javascript
await client.del('products')           // List cache
await client.del(`products:${id}`)     // Specific item cache
```

### DELETE (Delete)
- Invalidate **both list and specific item cache**
- List no longer includes deleted item
- Specific item shouldn't exist
```javascript
await client.del('products')           // List cache
await client.del(`products:${id}`)     // Specific item cache
```

## Multiple Cache Keys

For APIs with list + detail views, use two types of cache keys:

### List Cache
- Key: `'products'`
- Stores: All products array
- Used by: `GET /products`

### Individual Item Cache
- Key: `'products:123'`
- Stores: Single product with ID 123
- Used by: `GET /products/123`

**These are separate cache entries.** Deleting one doesn't delete the other.

## Why Delete Both Caches?
```
Redis has:
Key: 'products'      → [{id:123, title:"Old"}, {id:456, title:"..."}]
Key: 'products:123'  → {id:123, title:"Old", content:"..."}
```

When you update product 123:
1. Delete `'products'` → List cache gone
2. **Must also delete `'products:123'`** → Otherwise still has old data

If you only delete the list:
- `GET /products` → Fetches fresh data ✅
- `GET /products/123` → Returns old cached data ❌

## The Flow After Invalidation
```
1. User updates product 123
2. Database updated
3. Cache invalidated (both keys deleted)
4. Next GET request → Cache MISS
5. Fetch fresh data from database
6. Cache it again
7. Return to user
```

## Why Not Update Cache Instead of Deleting?

You *could* update the cache directly:
```javascript
await client.setEx('products', 60, JSON.stringify(updatedProducts))
```

**But deleting is simpler and safer:**
- Less code
- No risk of cache getting out of sync
- Writes are rare compared to reads (one cache miss is acceptable)