const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

usersRouter.post('/', async (req, res) => {
  const { body } = req
  const { username, name, password } = body

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const userSaved = await newUser.save()
  res.status(201).json(userSaved)
})

usersRouter.get('/', async (req, res, next) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1
  })

  res.json(users)
})

module.exports = usersRouter
