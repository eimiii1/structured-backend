import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    emailAddress: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
})

const userModel = mongoose.model('User', userSchema)
export default userModel;