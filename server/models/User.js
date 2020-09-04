const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  google: Object
})

const User = mongoose.model('User', userSchema)

module.exports = User