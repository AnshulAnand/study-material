const express = require('express')
const { showCase, createOrder } = require('../controllers/pro.controller')
const router = express.Router()
const verifyJwt = require('../middlewares/verifyJwt')

router.get('/', showCase)
router.post('/create-order', verifyJwt, createOrder)

module.exports = router
