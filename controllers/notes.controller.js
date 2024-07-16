const asyncHandler = require('express-async-handler')

module.exports.semesters = asyncHandler(async (req, res) => {
  const branch = req.params.branch
  data = { branch: branch }
  console.log({ data })
  res.render('semesters', data)
})

module.exports.semester = asyncHandler(async (req, res) => {
  const sem = req.params.sem
  data = { sem: sem }
  console.log({ data })
  res.render(`csda/${sem}/index`)
})

module.exports.subject = asyncHandler(async (req, res) => {
  const subject = req.params.subject
  const path = req.originalUrl
  console.log({ path })
  data = { subject: subject }
  console.log({ data })
  res.render(`${path.slice(1)}`)
})
