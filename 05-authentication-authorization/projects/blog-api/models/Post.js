import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

const postModel = mongoose.model('Post', postSchema)
export default postModel;