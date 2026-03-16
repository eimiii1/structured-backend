import express from 'express'
import Post from "../models/Post.js"
import authMiddleware from '../middleware/auth.js'

const router = express.Router()
router.get('/', (req, res, next) => {
    Post.find()
        .then(post => res.status(200).json({ status: 200, posts: (post.length === 0 ? 'No posts found.' : post) }))
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Post.findById(id)
        .then(post => {
            if (!post) return next({ status: 404, message: 'Post not found.' })
            res.status(200).json({
                status: 200, data: [
                    {
                        title: post.title,
                        description: post.description,
                    }
                ]
            })
        })
        .catch(err => next(err))
})

router.post('/', authMiddleware, (req, res, next) => {
    const { title, description } = req.body
    const newPost = new Post({ title, description, userId: req.user.id })
    newPost.save()
        .then(() => res.status(201).json({
            status: 201, message: 'Post created.', data: [
                {
                    title: title,
                    description: description,
                    userId: req.user.id,
                }
            ]
        }))
        .catch(err => next(err))
})

router.put('/:id', authMiddleware, (req, res, next) => {
    const id = req.params.id
    Post.findById(id)
        .then(post => {
            if (!post) return next({ status: 404, message: 'Post not found.' })
            if (post.userId.toString() !== req.user.id) return next({ status: 403, message: 'Not authorized.' })

            return Post.findByIdAndUpdate(id, req.body, { new: true })
        })
        .then(updated => res.status(201).json({ status: 201, message: 'Post updated.', newData: [
            {
                title: updated.title,
                description: updated.description
            }
        ]}))
        .catch(err => next(err))
})

router.delete('/:id', authMiddleware, (req, res, next) => {
    const id = req.params.id
    Post.findById(id)
        .then(post => {
            if (!post) return next({ status: 404, message: 'Post not found.' })
            if (post.userId.toString() !== req.user.id) return next({ status: 403, message: 'Not authorized' })

            return Post.findByIdAndDelete(id)
        })
        .then(deleted => res.status(201).json({ status: 201, message: 'Post deleted.' }))
        .catch(err => next(err))
})

export default router;