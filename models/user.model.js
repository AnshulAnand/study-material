const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    payment: { type: Boolean, required: true, default: false },
    image: { type: String },
  },
  { timestamp: true }
)

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
