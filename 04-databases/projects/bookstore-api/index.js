import express from 'express'
import './db.js'
import Book from './models/Book.js'

const app = express() 
const PORT = 3000
app.use(express.json())

const validateBook = (req, res, next) => {
    if (!req.body.title || !req.body.author) {
        return next({status: 400, message: 'Fields cannot be empty.'})
    } else if (typeof req.body.title !== 'string' || typeof req.body.author !== 'string') {
        return next({status: 400, message: 'Request must be a string.'})
    }
    next()
}

app.post('/books', validateBook, (req, res, next) => {
    const model = new Book(req.body)
    model.save()
        .then(() => res.status(201).json({status: 201, message: 'New book saved.'}))
        .catch(err => next(err))
})

app.get('/books', (req, res, next) => {
    Book.find()
        .then(b => res.json(b))
        .catch(err => next(err))
})

app.get('/books/:id', (req, res, next) => {
    const id = req.params.id

    Book.findById(id)
        .then(book => {
            if (!book) {
                return next({status: 404, message: 'Book not found.'})
            }
            res.status(200).json(book)
        })
        .catch(err => next(err))
})

app.put('/books/:id', validateBook, (req, res, next) => {
    const id = req.params.id

    Book.findByIdAndUpdate(id, req.body, {new: true})
        .then(book => {
            if (!book) {
                return next({status: 404, message: 'Book not found.'})
            }
            res.status(200).json({status: 201, message: 'Book updated.'})
        })
        .catch(err => next(err))
})

app.delete('/books/:id', (req ,res, next) => {
    const id = req.params.id 

    Book.findByIdAndDelete(id)
        .then(book => {
            if (!book) {
                return next ({status: 404, message: 'Book not found.'})
            }
            res.status(200).json({status: 200, message: 'Book deleted', data: book})
        })
        .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({status, message: err.message})
}

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`)
})