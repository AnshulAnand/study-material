const jwt = require('jsonwebtoken')

const verifyJwt = async (req, res, next) => {
  const cookies = req.cookies

  console.log({ cookies })

  if (!cookies?.jwt) {
    res.status(401).render('unauthorized')
    return
  }

  console.log({ jwt: cookies.jwt })

  const JWT = cookies.jwt

  jwt.verify(JWT, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log({ err })
      res.status(403).render('unauthorized')
      return
    }
    req.user = decoded
    next()
  })
}

module.exports = verifyJwt
