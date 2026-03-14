import express from 'express'
import authRoutes from './routes/auth.js'
import './db.js'
import authMiddleware from './middleware/auth.js'

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)

app.get('/profile', authMiddleware, (req, res, next) => {
    const { id, username } = req.user
    res.status(200).json({status: 200, message: 'Profile exists.', data: [id, username]})
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`)
})