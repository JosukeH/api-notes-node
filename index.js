require('dotenv').config()
const express = require('express')
const cors = require('cors')

require('./mongo')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
// app.use((req, res, next) => {
//   console.log(req.method)
//   console.log(req.path)
//   console.log(req.body)
//   next()
// })

app.get('/', (req, res) => {
  res.send('<h1>Hola </h1>')
})

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(notFound)
app.use(handleErrors)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
