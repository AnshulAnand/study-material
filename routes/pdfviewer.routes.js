const express = require('express')
const router = express.Router()
const { renderPdf } = require('../controllers/pdfviewer.controller')
const verifyJwt = require('../middlewares/verifyJwt')

router.get('/:id', verifyJwt, renderPdf)

module.exports = router
