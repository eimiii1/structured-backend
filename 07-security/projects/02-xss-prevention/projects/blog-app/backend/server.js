import express from 'express'
import cors from 'cors'
import './database.js'
import authRoute from './routes/users/auth.js'
import postRoute from './routes/posts/post.js'
import timelineRoute from "./routes/posts/timeline.js"

const app = express()
const port = 3000

// middleware
app.use(express.json())
app.use(cors())
app.use('/users', authRoute)
app.use(`/user`, postRoute)
app.use('/', timelineRoute)


app.listen(3000, () => {
    console.log(`Server running at http:localhost:${port}`)
})