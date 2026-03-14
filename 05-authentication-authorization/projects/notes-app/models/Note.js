import mongoose from 'mongoose'

const noteSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const noteModel = mongoose.model('Note', noteSchema)
export default noteModel