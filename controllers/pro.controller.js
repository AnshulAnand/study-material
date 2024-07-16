const asyncHandler = require('express-async-handler')

module.exports.showCase = asyncHandler(async (req, res) => {
  res.render('unauthorized')
})
