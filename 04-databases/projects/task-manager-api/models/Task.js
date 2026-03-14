import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'pending' },
    dueDate: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const taskModel = mongoose.model('Task', taskSchema)

export default taskModel;