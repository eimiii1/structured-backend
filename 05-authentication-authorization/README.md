# 05 - Authentication & Authorization

Authentication and authorization are two core concepts in backend security.

- **Authentication** — verifying who the user is (register, login, password hashing)
- **Authorization** — verifying what the user is allowed to do (JWT, protected routes, ownership checks)

---

## Concepts Covered

### Password Hashing with bcrypt

Passwords are never stored as plain text. `bcrypt` hashes passwords with a random **salt** so even identical passwords produce different hashes. On login, `bcrypt.compare()` re-hashes the input using the stored salt and checks if they match.

### JSON Web Tokens (JWT)

After a user logs in, the server creates a signed token using `jwt.sign(payload, secretKey, options)`. The token is sent back to the client and stored. On every protected request, the client sends the token in the `Authorization` header as `Bearer <token>`. The server verifies it with `jwt.verify()` — no database lookup needed.

**JWT Structure:**

```
header.payload.signature
```

- **Header** — algorithm used (e.g. HS256)
- **Payload** — user data (e.g. id, username) — base64 encoded, not encrypted
- **Signature** — HMAC of header + payload using the secret key — tamper-proof

### Auth Middleware

A reusable middleware function that extracts and verifies the JWT from the request header. If valid, it attaches the decoded payload to `req.user` so route handlers can access the logged-in user's data.

### Ownership Checks

When a user tries to modify or delete a resource, the server checks that `resource.userId` matches `req.user.id`. This prevents users from accessing or modifying other users' data.

---

## Folder Structure

```
05-authentication-authorization/
├── notes/
│   └── notes.md
├── projects/
│   ├── 01-jwt-auth/          # Basic register/login with JWT
│   └── 02-notes-app/         # Full CRUD with ownership checks
└── README.md
```

---

## Key Packages

| Package        | Purpose                         |
| -------------- | ------------------------------- |
| `bcrypt`       | Password hashing and comparison |
| `jsonwebtoken` | JWT creation and verification   |
| `mongoose`     | MongoDB ODM                     |
| `dotenv`       | Environment variable management |

---

## API Flow

```
POST /auth/register  →  hash password  →  save user to DB
POST /auth/login     →  find user  →  compare password  →  return JWT
GET  /protected      →  verify JWT  →  attach req.user  →  handle request
```