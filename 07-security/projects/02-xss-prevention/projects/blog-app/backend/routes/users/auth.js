import User from '../../models/User.js'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const router = express.Router()

const userSchema = z.object({
    username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]{3,20}$/),
    email: z.email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
})

router.post('/register', async (req, res, next) => {
    console.log(req.body)
    const result = userSchema.safeParse(req.body)
    if (!result.success) {
        console.log(result.error.issues)
        return res.status(400).json({
            status: 400,
            errors: result.error.issues
        })
    }

    // if result -> success
    const { username, email, password } = result.data

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        // save to database

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            status: 201,
            message: 'Account registered.',
            data: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found.'
            })
        }
        
        const compare = await bcrypt.compare(password, user.password)

        if (!compare) {
            return next({
                status: 401,
                message: 'Status 401 - Not Authorized.'
            })
        }

        // if compare success -> create a token
        const token = jwt.sign(
            {id: user._id, username: user.username, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )
        
        res.status(200).json({
            status: 200,
            token: token
        })
    } catch (err) {
        next(err)
    }
})

export default router