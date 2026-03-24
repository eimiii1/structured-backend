import express from 'express'
import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import { createClient } from 'redis'
import Post from '../../models/Post.js'
import authMiddleware from '../../middleware/auth.js'

const redisClient = createClient()
await redisClient.connect()

const router = express.Router()

const window = new JSDOM(' ').window

router.post('/post', authMiddleware, async (req, res, next) => {
    const purify = DOMPurify(window)
    const {title, content} = req.body 
    
    // sanitize
    const safeTitle = purify.sanitize(title)
    const safeContent = purify.sanitize(content)

    const post = await Post.create({
            title: safeTitle,
            content: safeContent, 
            userId: req.user.id
    })

    if (!post) {
        res.status(401).json({
            status: 401,
            message: 'Error on creating post.'
        })
    }

    // if created -> cache MISS
    await redisClient.del('posts')

    res.status(201).json({
        status: 201,
        message: 'Post created.'
    })
})

export default router