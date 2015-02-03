_ = require 'lodash'
Band = require '../models/band'
Vote = require '../models/vote'

getIpAddress = (ipObj) ->
  if ipObj?
    ipObj.clientIp
  else
    'unknown'

# GET /bandsNoAuth
exports.indexNoAuth = (req, res) ->
  pop =
    path: 'children'
    select: 'user_id'
  Band.find().populate(pop).sort(vote_count: 'descending', name: 'ascending').exec(
    (err, result) ->
      return res.status(500).json error: err if err?
      return res.status(200).json result
  )

# GET /api/bands
exports.index = (req, res) ->
  userId = req.user._id.toString()
  pop =
    path: 'children'
    select: 'user_id'
  Band.find().populate(pop).sort(vote_count: 'descending', name: 'ascending').exec(
    (err, result) ->
      if err?
        return res.status(500).json error: err
      else
        # create a new result array that includes an object property
        # boolean for whether user has voted on this particular band
        newResult = _.map result, (obj) ->
          hasVoted = if _.find(obj.children, { user_id: userId })? then true else false
          return _.assign obj, userHasVotedFor: hasVoted
        return res.status(200).json newResult
  )

# GET /api/bands/:id
exports.show = (req, res) ->
  Band.findById req.params.id, (err, result) ->
    return res.status(500).json error: err if err?
    return res.status(200).json result

# POST /api/bands
exports.create = (req, res) ->
  userId = req.user._id
  req.body.submitted_by = userId
  new Band(req.body).save (err, result1) ->
    return res.status(500).json error: err if err?
    data =
      parent: result1._id,
      user_id: userId
      user_ip_address: getIpAddress(req.session.ipAddress)
    new Vote(data).save (err, result2) ->
      return res.status(500).json error: err if err?
      # this is really hacky; should be better way
      result1.children = [result2._id]
      result1.userHasVotedOn = true
      return res.status(200).json result1

# POST /api/bands/:id/vote
exports.vote = (req, res) ->
  data =
    parent: req.params.id
    user_id: req.user._id
    user_ip_address: getIpAddress(req.session.ipAddress)
  new Vote(data).save (err, result) ->
    return res.status(500).json error: err if err?
    return res.status(200).json result

# PUT /api/bands/:id
exports.update = (req, res) ->
  Band.update {_id: req.params.id}, req.body, (err, count) ->
    return res.status(500).json error: err if err?
    return res.status(200).json message: "#{count} records updated"

# DELETE /api/bands/:id
exports.delete = (req, res) ->
  Band.remove {_id: req.params.id}, (err, count) ->
    return res.status(500).json error: err if err?
    return res.status(200).json message: "#{count} records deleted"
