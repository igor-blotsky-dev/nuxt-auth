const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require('passport')
const config = require("../config/auth.config");


module.exports.login = function (req, res, next) {
  passport.authenticate('local', {
    session: false
  }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message
      });
    }

    const accessToken = jwt.sign({
      id: user.id
    }, config.secret, {
      expiresIn: 86400 /* 24 hours */
    });
    return res.json({
      user,
      accessToken
    });
  })(req, res)
};


module.exports.register = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({
        message: err
      });
      return;
    }

    res.send({
      message: "User was registered successfully!"
    });

  });
};

module.exports.googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email']
})




module.exports.googleRedirect = (req, res, next) => {
  passport.authenticate('google', {}, (err, user) => {
    console.log(1, err)

    if (err || !user) {
      res
        .status(301)
        .redirect('/')
    }



    const accessToken = jwt.sign({
      id: user.id
    }, config.secret, {
      expiresIn: 86400 /* 24 hours */
    });

    return res
      .cookie('jwt auth', accessToken, {
        maxAge: 1000 * 60 * 10,
        httpOnly: false
      })
      .status(301)
      .redirect('/')
  })(req, res)
}
