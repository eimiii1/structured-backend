import express from 'express'
import Note from "../models/Note.js"

const router = express.Router()
router.post('/', (req, res, next) => {
    const newNote = new Note({title: req.body.title, description: req.body.description, userId: req.user.id})
    newNote.save()
        .then(() => res.status(201).json({status: 201, message: 'Note created'}))
        .catch(err => next(err))
})

router.get('/', (req, res, next) => {
    Note.find({userId: req.user.id})
        .then(note => {
            if (note.length === 0) return next({status: 404, message: 'Notes for this user is not found.'})
            res.status(200).json({status: 200, data: [note]})
        })
        .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Note.findById(id)
        .then(note => {
            if (!note) return next({status: 404, message: 'Note not found.'})
            if (note.userId.toString() !== req.user.id) return next({status: 403, message: 'Unauthorized.'})
            res.status(200).json({status: 200, message: 'Note found.', data: [{
                title: note.title,
                description: note.description,
                userId: note.userId
        }]})
        })
        .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
    const id = req.params.id
    Note.findById(id)
        .then(note => {
            if (!note) return next({status: 404, message: 'Note not found.'})
            if (note.userId.toString() !== req.user.id) return next({status: 403, message: 'Unauthorized'})
            return Note.findByIdAndUpdate(id, req.body, {new: true})
        })
        .then(updated => res.status(201).json({status: 201, message: 'Note updated.', new_data: updated}))
        .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id 
    Note.findById(id)
        .then(note => {
            if (!note) return next({status: 404, message: 'Note not found.'})
            if (note.userId.toString() !== req.user.id) return next({status: 403, message: 'Unauthorized'})
            return Note.findByIdAndDelete(id)
        })
        .then(deleted => {
            if (!deleted) return 
            res.status(200).json({status: 200, message: 'Note deleted', deletedData: deleted})
        })
        .catch(err => next(err))
})

export default router