mongoose = require 'mongoose'
relationship = require 'mongoose-relationship'
Schema = mongoose.Schema

voteSchema = new mongoose.Schema(
  user_id:
    type: String
    required: true
  parent: [
    type: Schema.ObjectId
    ref: 'Band'
    childPath: 'children'
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

relationshipOpts =
  relationshipPathName: 'parent'
  triggerMiddleware: true

voteSchema.plugin relationship, relationshipOpts

module.exports = mongoose.model('Vote', voteSchema)
