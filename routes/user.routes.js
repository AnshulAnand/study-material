const express = require('express')
const router = express.Router()
const {
  auth,
  googleAuth,
  logoutUser,
} = require('../controllers/user.controller')
const verifyJwt = require('../middlewares/verifyJwt')
const serialiseUser = require('../middlewares/serialiseUser')

router
  .get('/', serialiseUser, auth)
  .get('/google', googleAuth)
  .get('/logout', verifyJwt, logoutUser)

module.exports = router
