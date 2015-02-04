_ = require 'lodash'
mask = require 'json-mask'
Band = require '../models/band'
Vote = require '../models/vote'

WHITELIST = [
  '_id'
  'name'
  'parent'
  'vote_count'
  'userHasVotedFor'
].join(',')

# removes data that shouldn't be returned in json
partialResponse = (json) ->
  mask(json, WHITELIST)

# returns ip address
getIpAddress = (ipObj) ->
  if ipObj?
    ipObj.clientIp
  else
    'unknown'

# GET /bandsNoAuth
exports.indexNoAuth = (req, res) ->
  Band.find().sort(vote_count: 'descending', name: 'ascending').exec(
    (err, result) ->
      return res.status(500).json error: err if err?
      return res.status(200).json partialResponse(result)
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
          userVotes = obj.users_who_voted_for
          hasVoted = if _.contains(userVotes, userId) then true else false
          return _.assign obj, userHasVotedFor: hasVoted
        return res.status(200).json partialResponse(newResult)
  )

# GET /api/bands/:id
exports.show = (req, res) ->
  Band.findById req.params.id, (err, result) ->
    return res.status(500).json error: err if err?
    return res.status(200).json partialResponse(result)

# POST /api/bands
exports.create = (req, res) ->
  userId = req.user._id
  req.body.submitted_by = userId
  new Band(req.body).save (err, result) ->
    return res.status(500).json error: err if err?
    req.params.id = result._id
    # when creating a new band record simultaneously add a vote
    return voteForBand(req, res)

# POST /api/bands/:id/vote
exports.vote = voteForBand = (req, res) ->
  data =
    parent: req.params.id
    user_id: req.user._id
    user_ip_address: getIpAddress(req.session.ipAddress)
  new Vote(data).save (err, result) ->
    return res.status(500).json error: err if err?
    return res.status(200).json partialResponse(result)

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
