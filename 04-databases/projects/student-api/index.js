import express from "express"
import Student from './models/Student.js'
import './db.js'

const app = express()
const PORT = 3000

// middleware
app.use(express.json())
const validateStudent = (req, res, next) => {
    if (!req.body.name || !req.body.age || !req.body.address || !req.body.gender || !req.body.phone || !req.body.emailAddress) {
        return next({status: 400, message: 'Fields cannot be empty.'})
    } else if (typeof req.body.name !== 'string' || typeof req.body.age !== 'number' || typeof req.body.address !== 'string' || typeof req.body.gender !== 'string' || typeof req.body.phone !== 'string' || typeof req.body.emailAddress !== 'string') {
        return next({status: 400, message: 'Datatype not correct.'})
    }
    next()
}

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({status, message: err.message})
}

app.post('/students', validateStudent, (req, res, next) => {
    const student = new Student(req.body)
    student.save()
        .then(() => res.status(201).json({status: 201, message: 'Student added.'}))
        .catch(err => next(err))
})

app.get('/students', (req, res, next) => {
    Student.find()
        .then(s => res.status(200).json(s))
        .catch(err => next(err))
})

app.get('/students/:id', (req, res, next) => {
    const id = req.params.id 
    Student.findById(id)
        .then(s => {
            if (!s) return next({status: 404, message: `Student with ${id} ID is not found.`})
            res.status(200).json(s)
        })
        .catch(err => next(err))
})

app.put('/students/:id', validateStudent, (req, res, next) => {
    const id = req.params.id 
    Student.findByIdAndUpdate(id, req.body, {new: true})
        .then(s => {
            if (!s) return next({status: 404, message: `Student with ${id} ID is not found.`})
            res.status(201).json({status: 201, message: 'Student data updated.'})
        })
        .catch(err => next(err))
})

app.delete('/students/:id', (req, res, next) => {
    const id = req.params.id 
    Student.findByIdAndDelete(id)
        .then(s => {
            if (!s) return next({status: 404, message: `Student with ${id} ID is not found`})
            res.status(200).json({status: 201, message: 'Student data deleted.'})
        })
        .catch(err => next(err))
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})