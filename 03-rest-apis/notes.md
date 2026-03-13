# REST API Notes

## Concepts Covered

### CRUD Routes

The 4 basic operations mapped to HTTP methods:

- `GET` — read
- `POST` — create
- `PUT` — update
- `DELETE` — delete

### URL Params vs Query Params

- **URL params** — part of the path, used to identify a specific resource: `/books/:id`
- **Query params** — optional filters appended to the URL: `/books?author=Dan`

### Request Body

Data sent by the client in POST/PUT requests. Accessed via `req.body`. Requires `express.json()` middleware to parse.

### Request Body Validation

Always validate before processing. Two main checks:

- **Falsy check** — catches `undefined`, `null`, `""`
    
    ```js
    if (!req.body.title) { ... }
    ```
    
- **Type check** — catches wrong data types
    
    ```js
    if (typeof req.body.title !== 'string') { ... }
    ```
    

Order matters: check falsy first, then type. `typeof undefined` returns `"undefined"` so it would be caught by the type check first if reversed.

### Validation Middleware

Extract validation logic into a reusable middleware function instead of repeating it in every route.

```js
const validateBook = (req, res, next) => {
    if (!req.body.title || !req.body.author) {
        return next({ status: 400, message: "Cannot be empty." })
    }
    if (typeof req.body.title !== 'string' || typeof req.body.author !== 'string') {
        return next({ status: 400, message: "Must be a string." })
    }
    next()
}

// Used in routes:
app.post('/books', validateBook, (req, res) => { ... })
app.put('/books/:id', validateBook, (req, res) => { ... })
```

### Error Handling Middleware

Centralized place to handle all errors. Takes 4 parameters — the `err` first is what makes Express recognize it as an error handler.

```js
const errorHandler = (err, req, res, next) => {
    res.status(err.status).json({ status: err.status, message: err.message })
}

app.use(errorHandler) // Must be at the bottom
```

**How errors flow:**

- Call `next(err)` anywhere to skip to the error handler
- Routes only handle the happy path (success responses)
- Error handler handles all failure responses

```
Valid request   → validateBook → next() → route handler → 200
Invalid request → validateBook → next(err) → errorHandler → 400
Not found       → route handler → next(err) → errorHandler → 404
```

### HTTP Status Codes Used

|Code|Meaning|
|---|---|
|200|OK|
|201|Created|
|400|Bad Request|
|404|Not Found|

### In-memory Storage

Data stored in a plain array — resets on server restart. Temporary until databases are introduced.

```js
const books = []
// id strategy: books.length + 1
```

### Useful Array Methods

- `find()` — returns the first matching element or `undefined`
- `findIndex()` — returns the index or `-1` if not found
- `Object.assign(target, source)` — merges source into target (used for PUT updates)
- `splice(index, 1)` — removes one element at index (used for DELETE)