const express = require('express')
const router = express.Router()
const { auth, googleAuth } = require('../controllers/user.controller')

router.get('/', auth).get('/google', googleAuth)

module.exports = router
