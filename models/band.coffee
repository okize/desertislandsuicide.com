mongoose = require 'mongoose'
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
  children: [
    type: Schema.ObjectId
    ref: 'Vote'
  ]
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
