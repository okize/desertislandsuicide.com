mongoose = require 'mongoose'
uniqueValidator = require 'mongoose-unique-validator'

bandSchema = new mongoose.Schema(
  name:
    type: String
    required: true
    unique: true
  created_at:
    type: Date
    default: Date.now
  updated_at:
    type: Date
    default: Date.now
  ,
    strict: true
)

bandSchema.plugin uniqueValidator

module.exports = mongoose.model('Band', bandSchema)
