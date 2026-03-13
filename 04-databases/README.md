# 04 - Databases

Learning how to connect a Node.js/Express API to a real database using MongoDB Atlas and Mongoose. Part of the `structured-backend` learning repo.

## Concepts Practiced

- MongoDB Atlas setup (cloud-hosted database)
- Mongoose schema and model definition
- Full CRUD with Mongoose methods
- Environment variables with dotenv
- Error handling for database errors

## Projects

### 1. Bookstore API

A REST API for managing a book collection connected to MongoDB Atlas.

**Endpoints:**

| Method | Route        | Description    |
| ------ | ------------ | -------------- |
| GET    | `/books`     | Get all books  |
| GET    | `/books/:id` | Get book by ID |
| POST   | `/books`     | Add a new book |
| PUT    | `/books/:id` | Update a book  |
| DELETE | `/books/:id` | Delete a book  |

**Book schema:** `title` (required), `author` (required), `genre` (optional)

### 2. Student API

A REST API for managing student records connected to MongoDB Atlas.

**Endpoints:**

|Method|Route|Description|
|---|---|---|
|GET|`/students`|Get all students|
|GET|`/students/:id`|Get student by ID|
|POST|`/students`|Add a new student|
|PUT|`/students/:id`|Update a student|
|DELETE|`/students/:id`|Delete a student|

**Student schema:** `name`, `age`, `address`, `gender`, `phone`, `emailAddress` (all required)

## Setup

```bash
npm install
```

Create a `.env` file:

```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname?appName=Cluster0
```

Run the server:

```bash
node index.js
```

## Stack

- Node.js + Express
- MongoDB Atlas
- Mongoose
- dotenv