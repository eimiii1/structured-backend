import express from 'express'
import { createClient } from 'redis'
import Comment from '../../models/Comment.js'
import Post from "../../models/Post.js"
import {JSDOM} from 'jsdom'
import DOMPurify from 'dompurify'
import authMiddleware from '../../middleware/auth.js'

const redisClient = createClient()
await redisClient.connect()

const window = new JSDOM(' ').window

const router = express.Router()

router.post('/post/:id/comments', authMiddleware, async (req, res) => {
    const purify = DOMPurify(window)
    const postId = req.params.id
    const comment = purify.sanitize(req.body.text)

    // ? Query to database
    const post = await Post.findById(postId)
    const newComment = await Comment.create({
        text: comment,
        postId: post.id,
        userId: req.user.id
    })

    await redisClient.del(`post:${postId}:comments`)
    res.status(201).json({
        status: 201,
        newComment
    })
})

export default router