const express = require('express')
const router = express.Router()
const {
  semesters,
  semester,
  subject,
  events,
} = require('../controllers/notes.controller')

router
  .get('/events', events)
  .get('/:branch/:sem/:subject', subject)
  .get('/:branch/:sem', semester)
  .get('/:branch', semesters)

module.exports = router
