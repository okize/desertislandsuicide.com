mongoose = require 'mongoose'

userSchema = new mongoose.Schema(
  email:
    type: String
    unique: true
    lowercase: true
  password: String
  facebook: String
  twitter: String
  google: String
  tokens: Array
  profile:
    name:
      type: String
      default: ''
    gender:
      type: String
      default: ''
    location:
      type: String
      default: ''
    website:
      type: String
      default: ''
    picture:
      type: String
      default: ''
  resetPasswordToken: String
  resetPasswordExpires: Date
)

module.exports = mongoose.model('User', userSchema)
