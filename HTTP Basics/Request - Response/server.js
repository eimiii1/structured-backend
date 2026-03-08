const express = require('express')
const app = express();

const PORT = 3000;
app.use(express.json());

const books = [
    {id: 1, title: "Harry Potter"},
    {id: 2, title: "The Hobbit"}
]

app.get('/', (req, res) => {
    res.send("Books server running!")
})

app.get('/books', (req, res) => {
    res.json(books)
})

app.get('/books/:bookID', (req, res) => {
    const id = parseInt(req.params.bookID);
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({message: "Book not found."})
    res.json(book)
})

app.post('/books', (req, res) => {
    const newBook = req.body;
    if (!newBook.id || !newBook.title) return res.status(400).json({message: "ID and Title are required!"})
    books.push(newBook);
    res.json({message: "Book added!", book: newBook})
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})