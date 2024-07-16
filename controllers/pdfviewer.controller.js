const asyncHandler = require('express-async-handler')

module.exports.renderPdf = asyncHandler(async (req, res) => {
  const id = req.params.id
  data = { id: id }
  console.log({ data })
  res.render('pdfviewer', data)
})
