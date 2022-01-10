module.exports = (req, res, next) => {
  res.status(404).json({ error: "404 || URL don't exist" })
}
