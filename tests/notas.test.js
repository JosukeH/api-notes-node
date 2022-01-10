const moongose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')

const api = supertest(app)

test('app returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('app returned as json', async () => {
  const res = await api.get('/api/notes')

  expect(res.body).toHaveLength(2)
})

afterAll(() => {
  moongose.disconnect()
  server.close()
})
