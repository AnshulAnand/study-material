const express = require('express')
const router = express.Router()
const {
  semesters,
  semester,
  subject,
  releaseNotes,
} = require('../controllers/notes.controller')

router
  .get('/release-notes', releaseNotes)
  .get('/:branch/:sem/:subject', subject)
  .get('/:branch/:sem', semester)
  .get('/:branch', semesters)

module.exports = router
