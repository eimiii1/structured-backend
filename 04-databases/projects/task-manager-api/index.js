import express from 'express'
import './db.js'
import User from './models/User.js'
import Task from "./models/Task.js"

const app = express()
app.use(express.json())

const validateUser = (req, res, next) => {
    if (!req.body.name || !req.body.email) {
        return next({status: 400, message: 'Fields cannot be empty.'})
    } else if (typeof req.body.name !== 'string' || typeof req.body.email !== 'string') {
        return next({status: 400, message: 'Required fields must have a string datatype.'})
    }
    next()
}

const validateTask = (req, res, next) => {
    if (!req.body.title || !req.body.description || !req.body.dueDate) {
        return next({status: 400, message: 'Fields cannot be empty.'})
    } else if (typeof req.body.title !== 'string' || typeof req.body.description !== 'string' || typeof req.body.dueDate !== 'string') {
        return next({status: 400, message: 'Required fields must have a string datatype.'})
    }
    next()
}

const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({status, message: err.message})
}

app.post('/users', validateUser, (req, res, next) => {
    const user = new User(req.body)
    user.save()
        .then(() => res.status(201).json({status: 201, message: 'User created.', data: user}))
        .catch(err => next(err))
})

app.post('/tasks', validateTask, (req, res, next) => {
    const task = new Task(req.body)
    task.save()
        .then(() => res.status(201).json({status: 201, message: `Task created`}))
        .catch(err => next(err))
})

app.get('/tasks', (req, res, next) => {
    Task.find({userId: req.query.userId})
        .then(t => {
            if (t.length === 0) return next({status: 404, message: 'No tasks found for this user.'})
            res.status(200).json(t)
        })
        .catch(err => next(err))
})

app.put('/tasks/:id', validateTask, (req, res, next) => {
    const id = req.params.id 
    Task.findByIdAndUpdate(id, req.body, {new: true})
        .then(t => {
            if (!t) return next({status: 404, message: 'Task not found.'})
            res.status(201).json({status: 201, message: 'Task updated.'})
        })
        .catch(err => next(err))
})

app.delete('/tasks/:id', (req, res, next) => {
    const id = req.params.id
    Task.findByIdAndDelete(id)
        .then(t => {
            if (!t) return next({status: 404, message: 'Task not found.'})
            res.status(201).json({status: 201, message: 'Task deleted'})
        })
        .catch(err => next(err))
})

app.use(errorHandler)
app.listen(3000, () => {
    console.log(`Server running at http://localhost:${3000}`)
})