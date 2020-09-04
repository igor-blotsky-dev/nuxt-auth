const passport = require('passport')
const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!err) req.user = user
    next()
  })(req, res)
}

module.exports = isAuthenticated