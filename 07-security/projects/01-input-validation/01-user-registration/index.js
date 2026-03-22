import express from 'express'
import bcrypt from 'bcrypt'
import './db.js'
import User from './models/User.js'
import redis from 'redis'
import userSchema from './validators/userValidator.js'

const redisClient = redis.createClient()
await redisClient.connect()

const app = express()
app.use(express.json())

app.post('/register', async (req, res) => {
    const result = userSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            status: 400,
            errors: result.error.issues
        })
    }

    const { username, email, password, age } = result.data

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            age
        })

        await redisClient.del('users')

        res.status(201).json({
            status: 201,
            message: 'Account created.',
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                age: user.age
            }
        })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 409,
                message: 'Username or email alredy exists.'
            })
        }
        
        res.status(500).json({
            status: 500,
            message: 'Server error',
            error: err.message
        })
    }
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`)
})