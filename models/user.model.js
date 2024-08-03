const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    payment: { type: Boolean, required: true, default: false },
    lastPayment: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
