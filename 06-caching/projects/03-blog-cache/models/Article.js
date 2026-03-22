import mongoose from 'mongoose'

const articleSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }

}, { timestamps: true })

const articleModel = mongoose.model('Article', articleSchema)
export default articleModel