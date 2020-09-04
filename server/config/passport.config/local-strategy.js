const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User')
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, 
  async function (username, password, done) {
    User.findOne({ username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'User was not found' }); }
      // if (!user.verifyPassword(password)) { return done(null, false); }
      if (!bcrypt.compareSync(password, user.password)) { return done(null, false, { message: 'Wrong password' }); }
      return done(null, user, { message: 'Successfully logged in' });
    });
  }
));