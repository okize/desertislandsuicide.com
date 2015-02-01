mongoose = require 'mongoose'
uniqueValidator = require 'mongoose-unique-validator'
Schema = mongoose.Schema

bandSchema = new mongoose.Schema(
  name:
    type: String
    required: true
    index: true
    unique: true
  submitted_by:
    type: String
    required: true
  children: [
    type: Schema.ObjectId
    ref: 'Vote'
  ]
  userHasVotedFor:
    type: Boolean
    default: false
  vote_count:
    type: Number
    default: 0
    index: true
  created_at:
    type: Date
    default: Date.now
  updated_at:
    type: Date
    default: Date.now
  ,
    strict: true
)

# hook to keep vote_count up to date
bandSchema.pre 'save', (next) ->
  @vote_count = @children.length
  next()

bandSchema.plugin uniqueValidator

module.exports = mongoose.model('Band', bandSchema)