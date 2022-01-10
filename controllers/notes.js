const notesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Note = require('../models/Note')
const User = require('../models/User')

notesRouter.get('/', userExtractor, (req, res, next) => {
  Note.find({})
    .then(notes => res.json(notes))
    .catch(err => next(err))
})

notesRouter.get('/:id', userExtractor, (req, res, next) => {
  const { id } = req.params

  Note.findById(id).then(nota => {
    if (nota) {
      return res.status(200).json(nota)
    } else {
      res.status(404).end()
    }
  })
    .catch(err => {
      next(err)
    })
})

notesRouter.delete('/:id', userExtractor, (req, res, next) => {
  const id = req.params.id

  Note.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => {
      next(err)
    })
})

notesRouter.put('/:id', userExtractor, (req, res, next) => {
  const id = req.params.id
  const note = req.body

  const newNoteInfo = {
    content: note.content,
    importat: note.importat
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
})

notesRouter.post('/', userExtractor, async (req, res, next) => {
  const { content, important = false } = req.body
  const { userId } = req

  const user = await User.findById(userId)
  if (!content) return res.json({ error: 'content is missing' })

  const newNote = new Note({
    content,
    important,
    user: user._id
  })

  try {
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id)
    user.save()
    res.json(savedNote)
  } catch (error) {

  }
})

module.exports = notesRouter
