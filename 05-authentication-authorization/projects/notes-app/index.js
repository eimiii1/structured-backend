import express from 'express'
import './database.js'
import authRoutes from "./routes/auth.js"
import authMiddleware from './middleware/auth.js'
import noteRoutes from './routes/notes.js'

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)

app.get('/profile', authMiddleware, (req, res, next) => {
    const {id, username} = req.user
    if (!req.user) return next({status: 404, message: 'No profile provided.'})
    res.status(200).json({status: 200, data: [id, username]})
})

app.use('/notes', authMiddleware, noteRoutes)
app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({status, message: err.message})
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`)
})