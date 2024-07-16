const logger = require('./logger')
const logEvents = require('./logEvents')

const errorHandler = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`)
  logger.error(err.stack)
  logEvents(`${err.name}: ${err.message}`, 'logs.txt')
  logEvents(`${err.stack}`, 'logs.txt')
  const status = res.statusCode ? res.statusCode : 500 // server error
  res.status(status)
  res.json({ message: err.message })
  next()
}

module.exports = errorHandler
