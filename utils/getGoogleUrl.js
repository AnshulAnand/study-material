function getGoogleOAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options = {
    redirect_uri: process.env.GOOGLEOAUTHREDIRECTURL,
    client_id: process.env.GOOGLECLIENTID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  }
  console.log({ options })
  const qs = new URLSearchParams(options)
  console.log({ qs: qs.toString() })
  return `${rootUrl}?${qs.toString()}`
}
module.exports = getGoogleOAuthURL