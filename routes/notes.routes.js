const express = require('express')
const router = express.Router()
const {
  semesters,
  semester,
  subject,
} = require('../controllers/notes.controller')

router
  .get('/:branch', semesters)
  .get('/:branch/:sem', semester)
  .get('/:branch/:sem/:subject', subject)

module.exports = router
