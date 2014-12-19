mongoose = require 'mongoose'
relationship = require 'mongoose-relationship'
Schema = mongoose.Schema

voteSchema = new mongoose.Schema(
  created_at:
    type: Date
    default: Date.now
  updated_at:
    type: Date
    default: Date.now
  parent: [
    type: Schema.ObjectId
    ref: 'Band'
  ]
  ,
    strict: true
)

voteSchema.plugin uniqueValidator

module.exports = mongoose.model('Vote', voteSchema)
