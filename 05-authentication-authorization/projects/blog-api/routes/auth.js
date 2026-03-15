import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()
router.post('/register', async (req, res, next) => {
    const { emailAddress, username, password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10)

    const newUser = new User({ emailAddress, username, password: hashed_password })
    newUser.save()
        .then(() => res.status(201).json({
            status: 201, message: 'User registered.', data: [
                {
                    emailAddress: emailAddress,
                    username: username
                }
            ]
        }))
        .catch(err => next(err))
})

router.post('/login', async (req, res, next) => {
    const { emailAddress, password } = req.body;
    User.findOne({ emailAddress })
        .then(async user => {
            if (!user) return next({ status: 404, message: 'Email not found.' })

            // if email found -> compare password
            const compare = await bcrypt.compare(password, user.password);
            if (!compare) return next({ status: 403, message: 'Not authorized.' })

            // if compare == successful -> create token for user (jwt token -> payload, secret-key, headers)
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.status(200).json({ status: 200, message: 'Login successful.', token })
        })
        .catch(err => next(err))
})

export default router;