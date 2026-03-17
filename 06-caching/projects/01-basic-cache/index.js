import express from 'express'
import { createClient } from 'redis'

const client = createClient()
await client.connect()

const app = express()
app.use(express.json())

const products = [
    { category: 'Keyboard', name: 'AULA F75', price: 2599 },
    { category: 'Keyboard', name: 'AULA 68HE', price: 1479 },
    { category: 'Keyboard', name: 'Mad Lions 60 HE', price: 2599 },
]

app.get('/products', async (req, res) => {
    // cache key property -> 'products'
    const cacheKey = 'products'

    const cachedData = await client.get(cacheKey)

    // check if data exists in redis
    if (cachedData) {
        return res.status(200).json({
            status: 200,
            products: JSON.parse(cachedData)
        })
    }

    // if not exists -> set data in redis for future uses
    await client.set(cacheKey, JSON.stringify(products), {
        expiration: 60
    })

    // fetch directly from the source
    res.status(200).json({status: 200, products})
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`)
})