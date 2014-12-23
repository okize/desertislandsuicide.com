mongoose = require 'mongoose'
relationship = require 'mongoose-relationship'
Schema = mongoose.Schema

voteSchema = new mongoose.Schema(
  created_at:
    type: Date
    default: Date.now
  user_id:
    type: String
    required: true
  updated_at:
    type: Date
    default: Date.now
  band: [
    type: Schema.ObjectId
    ref: 'Band'
    childPath: 'votes'
  ]
  ,
    strict: true
)

voteSchema.plugin relationship, {relationshipPathName: 'band'}

module.exports = mongoose.model('Vote', voteSchema)
