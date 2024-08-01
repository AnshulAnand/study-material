const getGoogleOAuthURL = require('../utils/getGoogleUrl')
const axios = require('axios')
const qs = require('qs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')
const asyncHandler = require('express-async-handler')

module.exports.auth = (req, res) => {
  const link = getGoogleOAuthURL()
  data = { link: link }
  res.render('auth', data)
}

module.exports.googleAuth = asyncHandler(async (req, res) => {
  // get code from qs
  const code = req.query.code
  // get id and acess token
  const url = 'https://oauth2.googleapis.com/token'
  const values = {
    code: code,
    client_id: process.env.GOOGLECLIENTID,
    client_secret: process.env.GOOGLECLIENTSECRET,
    redirect_uri: process.env.GOOGLEOAUTHREDIRECTURL,
    grant_type: 'authorization_code',
  }
  const result = await axios.post(url, qs.stringify(values), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  const { id_token, access_token } = result.data
  console.log({ id_token, access_token })
  // get user with tokens
  const user = jwt.decode(id_token)
  console.log({ user })
  const duplicateEmail = await UserModel.findOne({ email: user.email }).lean()

  if (duplicateEmail) {
    const JWT = jwt.sign(
      {
        userId: duplicateEmail._id,
        name: duplicateEmail.name,
        avatar: duplicateEmail.image,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TTL }
    )

    res.cookie('jwt', JWT, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })

    res.redirect('/')
    return
  }

  const userObject = {
    name: user.name,
    email: user.email,
    image: user.picture,
  }

  const newUser = await UserModel.create(userObject)

  if (!newUser) {
    res.status(400).json({
      message: 'Invalid user data received, could not create user',
    })
    return
  }

  const JWT = jwt.sign(
    { userId: newUser._id, name: userObject.name, avatar: userObject.image },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TTL,
    }
  )

  res
    .cookie('jwt', JWT, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })
    .redirect('/')
})

module.exports.logoutUser = asyncHandler(async (req, res) => {
  const { userId } = req.user

  if (!userId) {
    res.status(400).json({ message: `User with ID: ${userId} not found` })
    return
  }

  const cookies = req.cookies

  if (!cookies?.jwt) {
    res.sendStatus(204)
    return
  }

  const foundUser = await UserModel.findById(userId).exec()

  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true })
    res.sendStatus(204)
    return
  }

  res.clearCookie('jwt', { httpOnly: true }).redirect('/').sendStatus(204)
})
