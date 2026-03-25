import express from 'express'
import { createClient } from 'redis'
import Post from '../../models/Post.js'

const redisClient = createClient()
await redisClient.connect()

const router = express.Router()
router.get('/post/:id', async (req, res, next) => {
    try {
        const id = req.params.id

        const cacheData = await redisClient.get(`posts:${id}`)
        if (cacheData) {
            return res.json({
                status: 200,
                post: JSON.parse(cacheData),
                source: 'cache'
            })
        }

        const post = await Post.findById(id).populate('userId', 'username email')

        if (!post) {
            return res.status(404).json({
                status: 404,
                message: 'Post not found.'
            })
        }

        await redisClient.set(`posts:${id}`, JSON.stringify(post), {
            EX: 300
        })
        res.json({
            status: 200,
            post,
            source: 'database'
        })
    } catch (err) {
        next(err)
    }
})

export default router