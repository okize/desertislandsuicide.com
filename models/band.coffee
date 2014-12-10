mongoose = require 'mongoose'

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

module.exports = mongoose.model('Band', bandSchema)
