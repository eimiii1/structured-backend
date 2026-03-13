import mongoose from "mongoose"

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    emailAddress: { type: String, required: true },
})

const studentModel = mongoose.model('Student', studentSchema)

export default studentModel