const asyncHandler = require('express-async-handler')
const UserModel = require('../models/user.model')
const dayjs = require('dayjs')

module.exports.renderPdf = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { userId } = req.user
  const foundUser = await UserModel.findById(userId).exec()

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true })
    res.sendStatus(204)
    return
  }

  if (!foundUser.payment) {
    res.render('unauthorized')
    return
  }

  const date1 = dayjs(dayjs().format('YYYY-MM-DD'))
  const dateDiff = date1.diff(foundUser.lastPayment, 'day')

  if (dateDiff > 120) {
    res.render('unauthorized')
    return
  }

  data = { id: id }
  res.render('pdfviewer', data)
})
