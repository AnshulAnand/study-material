require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const connectDB = require('./utils/connectDB')
const cookieParser = require('cookie-parser')
const logger = require('./utils/logger')
const logEvents = require('./utils/logEvents')
const errorHandler = require('./utils/errorHandler')
const UserModel = require('./models/user.model')

const PORT = process.env.PORT

connectDB()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())
const bodyParser = require('body-parser')
const asyncHandler = require('express-async-handler')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get(
  '/',
  require('./middlewares/serialiseUser'),
  asyncHandler(async (req, res) => {
    const user = req.user
    const foundUser = await UserModel.findById(user.userId).exec()
    data = { ...user, payment: foundUser?.payment }
    res.render('home', data)
  })
)

app.get('/privacy', (req, res) => res.render('privacy'))
app.get('/tos', (req, res) => res.render('tos'))

app.use('/view-pdf', require('./routes/pdfviewer.routes'))
app.use('/auth', require('./routes/user.routes'))
app.use('/pro', require('./routes/pro.routes'))
app.use('/', require('./routes/notes.routes'))
app.use('*', (req, res) => res.render('404'))
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`)
  logEvents(`Server started on port ${PORT}`, 'logs.txt')
})
