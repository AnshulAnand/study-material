const jwt = require('jsonwebtoken')

const serialiseUser = async (req, res, next) => {
  const cookies = req.cookies

  console.log({ cookies })

  if (!cookies?.jwt) {
    req.user = {}
    next()
    return
  }

  console.log({ jwt: cookies.jwt })

  const JWT = cookies.jwt

  jwt.verify(JWT, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log({ err })
      req.user = {}
      next()
      return
    }
    req.user = decoded
    next()
  })
}

module.exports = serialiseUser
