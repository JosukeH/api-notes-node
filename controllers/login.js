const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res, next) => {
  const { body } = req

  const { username, password } = body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  if (!(passwordCorrect && user)) return res.status(401).json({ error: 'invalid user or password' })

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 14
  })

  res.json({
    name: user.name,
    username: user.username,
    token

  })
})

module.exports = loginRouter
