import express from 'express'
import Comment from './models/Comment.js'
import cors from 'cors'
import './db.js'

const app = express()
app.use(express.json())
app.use(cors())

app.post('/comments', async (req, res) => {
    const { username, text } = req.body

    await Comment.create({
        username,
        text
    })
    
    res.status(201).json({
        status: 201,
        message: 'Comment created.'
    })
})

app.get('/comments', async (req, res) => {
    const comments = await Comment.find()

    res.json({
        comments: comments
    })
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`)
})