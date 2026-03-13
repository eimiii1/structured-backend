import express from "express"

const app = express()
const PORT = 3000

app.use(express.json())

const books = [];

const validateBook = (req, res, next) => {
    if (!req.body.title || !req.body.author) {
        return next({ status: 400, message: "Undefined. Cannot be empty." })
    } else if (typeof req.body.title !== 'string' || typeof req.body.author !== 'string') {
        return next({ status: 400, message: `Request ${req.body.title} must be a string.` })
    }

    next()
}

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({status, message: err.message})
}

app.post('/books', validateBook, (req, res) => {
    const newBook = { id: books.length + 1, ...req.body }
    books.push(newBook)
    res.status(201)
    res.json({status: 'ok', message: 'Request POST created.', data: [{
        id: newBook.id,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    }]})
})

app.get('/books', (req, res) => {
    res.status(200)
    res.json(books)
})

app.get('/books/:id', (req, res, next) => {
    const book = books.find(b => parseInt(req.params.id) === b.id)
    if (!book) {
        return next({status: 404, message: "Book couldn't be found."})
    }

    res.status(200)
    res.json(book)
})

app.put('/books/:id', validateBook, (req, res, next) => {
    const book = books.find(b => parseInt(req.params.id) === b.id)

    if (!book) {
        return next({status: 404, message: "Book couldn't be found."})
    }

    Object.assign(book, req.body)
    res.status(201)
    res.json({status: 'ok', message: 'Request PUT succeeded.', data: [{
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    }]})
})

app.delete('/books/:id', (req, res, next) => {
    const bookIndex = books.findIndex(b => parseInt(req.params.id) === b.id)

    if (bookIndex === -1) {
        return next({status: 404, message: "Book couldn't be found."})
    }

    books.splice(bookIndex, 1)
    res.status(200)
    res.json({status: 'ok', message: 'Book deleted.'})
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})