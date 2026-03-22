import express from 'express'
import { createClient } from 'redis'
import './db.js'
import Article from './models/Article.js'

const redisClient = createClient()
await redisClient.connect()

const app = express()
app.use(express.json())

app.get('/articles', async (req, res) => {
    const cacheData = await redisClient.get('articles')

    if (cacheData) {
        return res.status(200).json({
            status: 200,
            articles: JSON.parse(cacheData)
        })
    }

    // cache MISS
    const articles = await Article.find()
    await redisClient.setEx('articles', 60, JSON.stringify(articles))

    res.status(200).json({
        status: 200,
        articles
    })
})

app.get('/articles/:id', async (req, res) => {
    const articleId = req.params.id 
    const cacheKey = `articles:${articleId}`
    const cacheData = await redisClient.get(cacheKey)
    
    if (cacheData) {
        return res.status(200).json({
            status: 200,
            data: JSON.parse(cacheData)
        })
    }
    
    // cache MISS
    const article = await Article.findById(articleId)

    if (!article) return res.status(404).json({
        status: 404,
        message: 'Article not found.'
    })

    await redisClient.setEx(cacheKey, 60, JSON.stringify(article))
    res.status(200).json({
        status: 200,
        article
    })
})

app.post('/articles', async (req, res) => {
    const newArticle = await Article.create(req.body)
    await redisClient.del('articles')

    res.status(201).json({
        status: 201,
        message: 'Article added.'
    })
})

app.put('/articles/:id', async (req, res) => {
    const articleId = req.params.id
    const cacheKey = `articles:${articleId}`

    const article = await Article.findByIdAndUpdate(articleId, req.body, {new: true})
    
    if(!article) return res.status(404).json({
        status: 404,
        message: 'Article not found.'
    })
    
    await redisClient.del('articles')
    await redisClient.del(cacheKey)

    res.status(201).json({
        status: 201, 
        message: 'Article updated.'
    })
})

app.delete('/articles/:id', async (req, res) => {
    const articleId = req.params.id
    const cacheKey = `articles:${articleId}`

    const article = await Article.findByIdAndDelete(articleId)

    if (!article) return res.status(404).json({
        status: 404,
        message: 'Article not found.'
    })

    await redisClient.del('articles')
    await redisClient.del(cacheKey)

    res.status(200).json({
        status: 200,
        message: 'Article deleted.'
    })
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`)
})