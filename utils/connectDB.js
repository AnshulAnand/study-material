const mongoose = require('mongoose')
const logger = require('./logger')
const logEvents = require('./logEvents')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    const conn = await mongoose.connect(process.env.MONGOURI)
    logger.info(`Mongodb connected: ${conn.connection.host}`)
    logEvents(`Mongodb connected: ${conn.connection.host}`, 'logs.txt')
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

module.exports = connectDB
