mongoose = require 'mongoose'
relationship = require 'mongoose-relationship'
uniqueValidator = require 'mongoose-unique-validator'
Schema = mongoose.Schema

bandSchema = new mongoose.Schema(
  name:
    type: String
    required: true
    unique: true
  submitted_by:
    type: String
    required: true
  created_at:
    type: Date
    default: Date.now
  updated_at:
    type: Date
    default: Date.now
  votes: [
    type: Schema.ObjectId
    ref: 'Vote'
  ]
  ,
    strict: true
)

bandSchema.plugin uniqueValidator

module.exports = mongoose.model('Band', bandSchema)
