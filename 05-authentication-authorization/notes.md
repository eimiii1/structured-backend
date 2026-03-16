# Notes - Authentication & Authorization

## Why Auth?

HTTP is stateless — it forgets everything between requests. Auth solves this by giving the client a **token** after login. The client sends that token on every request so the server knows who's asking.

---

## bcrypt

- Never store plain text passwords
- `bcrypt.hash(password, saltRounds)` — hashes with a random salt, different result every time
- `bcrypt.compare(input, storedHash)` — extracts salt from stored hash, re-hashes input, compares
- Salt is embedded inside the hash string itself
- `saltRounds = 10` is the standard

```js
const hashedPassword = await bcrypt.hash(password, 10)
const match = await bcrypt.compare(inputPassword, user.password)
```

---

## JWT

Think of it like a **wristband at a theme park** — you prove who you are once at the entrance, get a wristband, and every ride just checks the wristband. No need to go back to the entrance each time.

- `jwt.sign(payload, secret, options)` — creates the token
- `jwt.verify(token, secret)` — verifies and decodes the token
- If tampered with → throws an error
- Never put sensitive data (passwords) in the payload — it's base64 encoded, not encrypted

```js
// Create token
const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' })

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET)
// decoded = { id, username, iat, exp }
```

**Token is sent in the Authorization header:**

```
Authorization: Bearer <token>
```

---

## Auth Middleware

```js
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return next({ status: 401, message: 'No token provided.' })

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded  // attach user to request
        next()
    } catch (err) {
        next(err)
    }
}
```

- `req.user` is not a built-in — you create it by attaching the decoded payload
- Pass middleware per route for selective protection, or via `app.use()` for all routes in a group

---

## Ownership Checks

```js
if (resource.userId.toString() !== req.user.id) 
    return next({ status: 403, message: 'Unauthorized.' })
```

- `userId` is a MongoDB ObjectId — need `.toString()` to compare with string from JWT payload
- Always check ownership before modifying or deleting a resource
- Find the resource first, check ownership, then update/delete

---

## Authentication vs Authorization

| |Authentication|Authorization|
|---|---|---|
|Question|Who are you?|What can you do?|
|Example|Login, password check|JWT, protected routes, ownership|

---

## Projects Built

### 01-jwt-auth

Basic register and login with JWT. No protected routes — just understanding the auth flow.

**Endpoints:**

- `POST /auth/register` — hash password, save user
- `POST /auth/login` — verify password, return JWT

### 02-notes-app

Full CRUD notes API where users can only access their own notes.

**Endpoints:**

- `POST /auth/register` + `POST /auth/login`
- `POST /notes` — create note (auth required, userId from token)
- `GET /notes` — get all notes for logged in user
- `GET /notes/:id` — get single note (ownership check)
- `PUT /notes/:id` — update note (ownership check)
- `DELETE /notes/:id` — delete note (ownership check)

**Key pattern for PUT/DELETE:**

```js
// 1. Find first
Note.findById(id)
    .then(note => {
        if (!note) return next({ status: 404, message: 'Not found.' })
        if (note.userId.toString() !== req.user.id) return next({ status: 403, message: 'Unauthorized.' })
        // 2. Then modify
        return Note.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    })
    .then(updated => res.status(200).json({ status: 200, data: updated }))
    .catch(err => next(err))
```