# 🧱 structured-backend

A structured, folder-based learning repo covering core backend development concepts — one concept per folder, built from the ground up.

---

## 📁 Repo Structure

```
structured-backend/
├── API Routing/
├── Authentication/
├── Caching/
├── Database CRUD/
├── Error Handling/
├── External APIs/
├── File Uploads/
├── HTTP Basics/
│   └── Request - Response/
├── Middleware/
├── Query Parameters/
├── Request Body/
├── Route Parameters/
├── Status Codes/
├── Validation/
└── README.md
```

---

## 📚 Concepts Covered

### 🔀 API Routing
How to structure and organize routes in a backend application. Covers route definitions, modular routing, and keeping your codebase clean as it scales.

### 🔐 Authentication
Securing your backend. Covers JWT, session-based auth, API keys, hashing passwords, and protecting routes with auth middleware.

### ⚡ Caching
Making your backend faster. Covers in-memory caching with Redis, cache invalidation strategies, TTL, and when (not) to cache responses.

### 🗄️ Database CRUD
The core of any backend — Create, Read, Update, Delete. Covers connecting to a database, writing queries, using ORMs, and handling data properly.

### 🚨 Error Handling
Writing resilient backends. Covers centralized error handling, custom error classes, validation errors, and returning consistent error responses to the client.

### 🌐 External APIs
Communicating with third-party services. Covers making HTTP requests, handling responses, dealing with API keys, rate limits, and error responses from external services.

### 📁 File Uploads
Handling files sent from clients. Covers multipart form data, storing files locally or in the cloud (S3), file size limits, and serving uploaded files back.

### 🌍 HTTP Basics / Request - Response
The foundation of the web. Covers the HTTP protocol, the anatomy of a request and response, headers, methods (GET, POST, PUT, DELETE), and the full request lifecycle.

### 🔧 Middleware
Functions that sit between the request and the response. Covers writing custom middleware, chaining middleware, and common use cases like logging, auth checks, and body parsing.

### 🔍 Query Parameters
Passing optional data through the URL. Covers parsing query strings, filtering, sorting, pagination, and validating query params.

### 📦 Request Body
Reading data sent by the client in the request body. Covers JSON payloads, form data, body parsers, and safely accessing body fields.

### 🛣️ Route Parameters
Dynamic segments in URLs. Covers defining and reading route params like `/users/:id`, using them in database queries, and handling invalid param values.

### 📊 Status Codes
Communicating outcomes through HTTP status codes. Covers the most important codes (200, 201, 400, 401, 403, 404, 500) and when to use each one correctly.

### ✅ Validation
Making sure incoming data is valid before processing it. Covers manual validation, schema-based validation with libraries like Zod or Joi, and returning helpful error messages.

---

## 🚀 Getting Started

Each folder is self-contained with its own code examples and notes.

```bash
git clone https://github.com/eimiii1/structured-backend.git
cd structured-backend
```

Navigate into any concept folder and follow the examples inside.

---

## 🛠 Tech Used

Most code examples use:

- **Node.js** + **Express**
- **MySQL** / **MongoDB**
- **Redis**

---

## 📄 License

MIT