const dayjs = require('dayjs')
const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')
const logger = require('./logger')

const logEvents = async (message, logFileName) => {
  const dateTime = dayjs().format()
  const logItem = `${dateTime}\t${message}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logFileName),
      logItem
    )
  } catch (err) {
    logger.error(err)
  }
}

module.exports = logEvents
