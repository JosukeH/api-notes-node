
const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send({ error: 'id used is malformed' }),
  validationError: res =>
    res.status(409).send({ error: 'ValidationError' }),
  JsonWebTokenError: res =>
    res.status(401).send({ error: 'token is missin or invalid' }),
  defaultError: res => res.status(500)

}

module.exports = (error, req, res, next) => {
  console.log(error.name)
  console.log('error is up')
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(res, error)
}
