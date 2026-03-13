import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String }
})

const bookModel = mongoose.model('book', bookSchema)

export default bookModel