import express from 'express'
import { createClient } from 'redis'
import Comment from '../../models/Comment.js'
import Post from "../../models/Post.js"

const redisClient = createClient()
await redisClient.connect()

const router = express.Router()

router.get('/post/:id/comments', async (req, res) => {
    const postId = req.params.id
    const cacheData = await redisClient.get(`post:${postId}:comments`)
    if (cacheData) {
        return res.status(200).json({
            status: 200,
            comments: JSON.parse(cacheData),
            source: 'cache'
        })
    }

    // ! fetch from database -> cache MISS
    const post = await Post.findById(postId)
    if (!post) {
        return res.status(404).json({
            status: 404,
            message: 'Post not found.'
        })
    }

    const comments = await Comment.find({ postId }).populate('userId', 'username')
    if (!comments) {
        res.status(404).json({
            status: 404,
            message: 'No comments.'
        })
    }
    
    await redisClient.set(`post:${postId}:comments`, JSON.stringify(comments), {
        EX: 300
    })
    
    res.status(200).json({
        status: 200,
        comments,
        source: 'database'
    })
})

export default router