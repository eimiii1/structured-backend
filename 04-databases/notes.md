# 04 - Databases Notes

## Why Databases?

In-memory arrays reset every time the server restarts. Databases persist data permanently.

## MongoDB vs SQL

|                  | MongoDB                | PostgreSQL/MySQL             |
| ---------------- | ---------------------- | ---------------------------- |
| Type             | Non-relational (NoSQL) | Relational (SQL)             |
| Data format      | JSON-like documents    | Tables with rows/columns     |
| Schema           | Flexible               | Strict                       |
| JS ecosystem fit | Natural (JSON)         | Works fine,, just more setup |

---

## MongoDB Atlas

Cloud-hosted MongoDB — no local install needed. Free M0 tier available.

**Setup:**

1. Create cluster on mongodb.com/cloud/atlas
2. Add database user (username + password)
3. Whitelist IP (`0.0.0.0/0` for development)
4. Get connection string under Connect → Drivers

---

## Mongoose

ODM (Object Document Mapper) — makes working with MongoDB in Node.js cleaner.

```bash
npm install mongoose
```

---

## Connecting to MongoDB

**db.js:**

```js
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error:', err))

export default mongoose
```

**.env:**

```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname?appName=Cluster0
```

- Database name goes before the `?` in the connection string
- Without it, Mongoose defaults to the `test` database

---

## Schema & Model

A **Schema** defines the shape of documents. A **Model** is the interface to interact with the collection.

```js
import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String }
})

const Book = mongoose.model('Book', bookSchema)
export default Book
```

- Mongoose auto-lowercases and pluralizes the model name → `'Book'` becomes `books` collection
- MongoDB auto-generates `_id` (ObjectId) for every document — no need to define it in the schema

---

## Mongoose CRUD Methods

All return Promises — always use `.then()` and `.catch()`.

### Create

```js
const book = new Book(req.body)
book.save()
    .then(() => res.status(201).json({message: 'Created'}))
    .catch(err => next(err))
```

### Read All

```js
Book.find()
    .then(books => res.json(books))
    .catch(err => next(err))
```

### Read One

```js
Book.findById(id)
    .then(book => {
        if (!book) return next({status: 404, message: 'Not found'})
        res.json(book)
    })
    .catch(err => next(err))
```

### Update

```js
Book.findByIdAndUpdate(id, req.body, { new: true })
    .then(book => {
        if (!book) return next({status: 404, message: 'Not found'})
        res.json({message: 'Updated'})
    })
    .catch(err => next(err))
```

- `{ new: true }` returns the updated document instead of the old one

### Delete

```js
Book.findByIdAndDelete(id)
    .then(book => {
        if (!book) return next({status: 404, message: 'Not found'})
        res.json({message: 'Deleted'})
    })
    .catch(err => next(err))
```

---

## Error Handling with Mongoose

Mongoose errors don't have a `status` property — always use a fallback:

```js
const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({status, message: err.message})
}
```

---

## ObjectId

MongoDB auto-generates a unique `_id` for every document. Looks like `64f3a2b1c9e77d001234abcd`. It's NOT sequential like `1, 2, 3` — it's based on timestamp + machine id + random value.

To query by id, use the full ObjectId string:

```
GET /books/64f3a2b1c9e77d001234abcd
```

---

## Environment Variables

Never hardcode credentials. Use `.env` + `dotenv`:

```bash
npm install dotenv
```

```js
import dotenv from 'dotenv'
dotenv.config()

// Access via:
process.env.MONGO_URI
```

	Always add `.env` to `.gitignore`!