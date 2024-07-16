const express = require('express')
const { showCase } = require('../controllers/pro.controller')
const router = express.Router()

router.get('/', showCase)

module.exports = router
