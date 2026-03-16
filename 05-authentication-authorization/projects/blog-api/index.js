import express from 'express'
import './db.js'
import authRoutes from './routes/auth.js'
import authMiddleware from './middleware/auth.js'
import postRoutes from "./routes/posts.js"

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/posts', postRoutes)

app.get('/profile', authMiddleware, (req, res, next) => {
    const { id, username } = req.user
    res.status(200).json({
        status: 200, profile: [
            {
                id: id,
                username: username
            }
        ]
    })
})

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({ status, message: err.message })
}

app.use(errorHandler)

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`)
})