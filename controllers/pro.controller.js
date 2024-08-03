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
  res.render('unauthorized')
})

module.exports.createOrder = async (req, res) => {
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

  const amount = req.body.amount * 100

  const options = {
    amount: amount,
    currency: 'INR',
    receipt: 'anandanshul001@gmail.com',
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
      foundUser.payment = true
      foundUser.lastPayment = dayjs().format('YYYY-MM-DD')
      foundUser.save()
    } else {
      res.status(400).send({ success: false, msg: 'Something went wrong!' })
    }
  })
}
