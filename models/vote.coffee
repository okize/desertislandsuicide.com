mongoose = require 'mongoose'
_ = require 'lodash'
relationship = require 'mongoose-relationship'
Band = require './band'
Schema = mongoose.Schema

voteSchema = new mongoose.Schema(
  user_id:
    type: String
    required: true
  user_ip_address:
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

voteSchema.pre 'save', (next) ->
  Band.findById @parent, (err, result) =>
    if err
      error = new Error 'something went wrong'
      return next(error)
    users = result.users_who_voted_for
    if users.includes(@user_id)
      error = new Error 'User already voted for this band'
      return next(error)
    else
      users.push @user_id
      result.save()
      return next()

relationshipOpts =
  relationshipPathName: 'parent'
  triggerMiddleware: true

voteSchema.plugin relationship, relationshipOpts

module.exports = mongoose.model('Vote', voteSchema)
