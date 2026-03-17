import express from 'express'
import { createClient } from 'redis'

const app = express()
app.use(express.json())

// create client for redis & connect
const client = createClient()
await client.connect()

const products = [
    { id: 1, name: 'Keyboard' },
    { id: 2, name: 'Monitor' },
    { id: 3, name: 'Mouse' }
]

app.get('/products', async (req, res) => {
    const cacheData = await client.get('products')

    if (cacheData) {
        return res.status(200).json({
            status: 200,
            products: JSON.parse(cacheData)
        })
    }

    // if cacheData not exist -> client.set for future use
    await client.setEx('products', 60, JSON.stringify(products))
    res.status(200).json({
        status: 200,
        products
    })
})

app.post('/products', async (req, res) => {
    const newProduct = req.body
    products.push({id: products.length + 1, ...newProduct})

    await client.del('products')
    res.status(201).json({
        status: 201,
        message: 'Product added',
        data: newProduct
    })
})

app.put('/products/:id', async (req, res) => {
    const product = products.find(prod => parseInt(req.params.id) === prod.id)
    if (!product) return res.status(404).json({
        status: 404,
        message: 'Product not found.'
    })

    await client.del('products')

    Object.assign(product, req.body)
    res.status(201).json({
        status: 201,
        message: 'Product Updated.'
    })
})

app.delete('/products/:id', async (req, res) => {
    const product = products.findIndex(prod => parseInt(req.params.id) === prod.id)
    if (product === -1) return res.status(404).json({
        status: 404,
        message: 'Product not found.'
    })
        
    await client.del('products')
    products.splice(product, 1)
    res.status(201).json({
        status: 201,
        message: 'Product Deleted.'
    })
})

app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`)
})