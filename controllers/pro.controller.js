const { RAZOR_PAY_ID_KEY, RAZOR_PAY_SECRET_KEY } = process.env
const asyncHandler = require('express-async-handler')
const Razorpay = require('razorpay')
const UserModel = require('../models/user.model')
const dayjs = require('dayjs')

const razorpayInstance = new Razorpay({
  key_id: RAZOR_PAY_ID_KEY,
  key_secret: RAZOR_PAY_SECRET_KEY,
})

module.exports.showCase = asyncHandler(async (req, res) => {
  const { userId } = req.user

  if (!userId) {
    res.redirect('/auth')
    return
  }

  const foundUser = await UserModel.findById(userId).exec()

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true })
    res.sendStatus(204)
    return
  }

  const date1 = dayjs(dayjs().format('YYYY-MM-DD'))
  const dateDiff = date1.diff(foundUser.lastPayment, 'day')

  if (foundUser.payment && dateDiff < 120) {
    res.redirect('/')
    return
  }

  res.render('unauthorized')
})

module.exports.createOrder = asyncHandler(async (req, res) => {
  const { userId } = req.user

  if (!userId) {
    res.status(400).json({ message: `User with ID: ${userId} not found` })
    return
  }

  const foundUser = await UserModel.findById(userId).exec()

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true })
    res.sendStatus(204)
    return
  }

  const { amount, currency, receipt, notes } = req.body

  const options = {
    amount: amount * 100,
    currency,
    receipt,
    notes,
  }

  razorpayInstance.orders.create(options, (err, order) => {
    if (!err) {
      res.status(200).send({
        success: true,
        msg: 'Order Created',
        order_id: order.id,
        amount: amount,
        key_id: RAZOR_PAY_ID_KEY,
        product_name: req.body.name,
        description: req.body.description,
        contact: '',
        name: foundUser.name || 'Unknown',
        email: foundUser.email || 'Unknown',
      })
    } else {
      res.status(400).send({ success: false, msg: 'Something went wrong!' })
    }
  })
})

module.exports.verify = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body

  if (!razorpay_order_id) {
    res.json({ message: 'No ID provided' })
    return
  }

  const { userId } = req.user

  if (!userId) {
    res.status(400).json({ message: `User with ID: ${userId} not found` })
    return
  }

  const foundUser = await UserModel.findById(userId).exec()

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true })
    res.sendStatus(204)
    return
  }

  paymentStatus = razorpayInstance.orders
    .fetchPayments(razorpay_order_id)
    .then(data => {
      if (
        data &&
        data.items &&
        data.items[0] &&
        data.items[0].status === 'captured'
      ) {
        foundUser.payment = true
        foundUser.lastPayment = dayjs().format('YYYY-MM-DD')
        foundUser.save()
      }

      res.redirect('/')
      return
    })
    .catch(err => {
      res.redirect('/')
      console.log(err)
    })
})
