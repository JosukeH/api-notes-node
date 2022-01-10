const mongoose = require('mongoose')

const { MONGO_URI, MONGO_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI

mongoose.connect(connectionString)
  .then(() => {
    console.log(`mongo db connected at ${NODE_ENV}`)
  })
  .catch(err => {
    console.log(err)
  })
