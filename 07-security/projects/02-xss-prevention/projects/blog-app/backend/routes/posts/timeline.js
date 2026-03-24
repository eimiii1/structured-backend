import express from 'express'
import Post from '../../models/Post.js'
import { createClient } from 'redis'

const router = express.Router()
const redisClient = createClient()
await redisClient.connect()

router.get('/timeline', async (req, res) => {
    const cacheData = await redisClient.get('posts')
    if (cacheData) {
        return res.status(200).json({
            status: 200,
            posts: JSON.parse(cacheData)
        })
    }
    
    // if no cache -> fetch from database -> set cache object
    const posts = await Post.find()
    if (!posts || posts.length === 0) {
        return res.status(404).json({
            status: 404,
            message: 'No posts found.'
        })
    }
    
    await redisClient.set('posts', JSON.stringify(posts), {
        EX: 300
    })
    res.status(200).json({
        status: 200,
        posts: posts
    })
})

export default router