import express from 'express'
import Post from "../models/Post.js"

const router = express.Router()
router.get('/', (req, res, next) => {
    Post.find()
        .then(post => res.status(200).json({status: 200, posts: (post.length === 0 ? 'No posts found.' : post)}))
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Post.findById(id) 
        .then(post => {
            if (!post) return next({status: 404, message: 'Post not found.'})
            res.status(200).json({status: 200, data: [
                {
                    title: post.title,
                    description: post.description,
                    userId: post.userId
                }
        ]})
        })
        .catch(err => next(err))
})

export default router;