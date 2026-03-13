# 📚 Book Library API

A REST API built with Express.js for managing a book collection. Part of the `structured-backend` learning repo — `03-rest-api` section.

## Concepts Practiced

- CRUD routes
- URL params & query params
- Request body validation
- Validation middleware
- Error handling middleware

## Endpoints

|Method|Route|Description|
|---|---|---|
|GET|`/books`|Get all books|
|GET|`/books/:id`|Get a book by ID|
|POST|`/books`|Add a new book|
|PUT|`/books/:id`|Update a book|
|DELETE|`/books/:id`|Delete a book|

## Request Body (POST / PUT)

```json
{
  "title": "string (required)",
  "author": "string (required)",
  "genre": "string (optional)"
}
```

## Validation Rules

- `title` and `author` are required and must be non-empty strings
- Returns `400` with an error message if validation fails

## Error Responses

```json
{
  "status": 400,
  "message": "Undefined. Cannot be empty."
}
```

## Running the Server

```bash
node server.js
```

Server runs at `http://localhost:3000`

## Notes

- Data is stored in-memory — resets on server restart
- No database yet (coming in `04-databases`)