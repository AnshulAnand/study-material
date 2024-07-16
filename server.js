require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const connectDB = require('./utils/connectDB')
const cookieParser = require('cookie-parser')
const logger = require('./utils/logger')
const logEvents = require('./utils/logEvents')

const PORT = process.env.PORT

connectDB()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.get('/', require('./middlewares/serialiseUser'), (req, res) => {
  const user = req.user
  data = user
  console.log({ data })
  res.render('home', data)
})

app.use('/view-pdf', require('./routes/pdfviewer.routes'))
app.use('/auth', require('./routes/user.routes'))
app.use('/pro', require('./routes/pro.routes'))
app.use('/', require('./routes/notes.routes'))

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`)
  logEvents(`Server started on port ${PORT}`, 'logs.txt')
})
