let voteForBand;
const _ = require('lodash');
const mask = require('json-mask');
const Band = require('../models/band');
const Vote = require('../models/vote');

const WHITELIST = [
  '_id',
  'name',
  'parent',
  'vote_count',
  'userHasVotedFor'
].join(',');

// removes data that shouldn't be returned in json
const partialResponse = json => mask(json, WHITELIST);

// returns ip address
const getIpAddress = function(ipObj) {
  if (ipObj != null) {
    return ipObj.clientIp;
  } else {
    return 'unknown';
  }
};

// GET /bandsNoAuth
exports.indexNoAuth = (req, res) =>
  Band.find().sort({vote_count: 'descending', name: 'ascending'}).exec(
    function(err, result) {
      if (err != null) { return res.status(500).json({error: err}); }
      return res.status(200).json(partialResponse(result));
  })
;

// GET /api/bands
exports.index = function(req, res) {
  const userId = req.user._id.toString();
  const pop = {
    path: 'children',
    select: 'user_id'
  };
  return Band.find().populate(pop).sort({vote_count: 'descending', name: 'ascending'}).exec(
    function(err, result) {
      if (err != null) {
        return res.status(500).json({error: err});
      } else {
        // create a new result array that includes an object property
        // boolean for whether user has voted on this particular band
        const newResult = _.map(result, function(obj) {
          const userVotes = obj.users_who_voted_for;
          const hasVoted = userVotes.includes(userId) ? true : false;
          return _.assign(obj, {userHasVotedFor: hasVoted});
        });
        return res.status(200).json(partialResponse(newResult));
      }
  });
};

// GET /api/bands/:id
exports.show = (req, res) =>
  Band.findById(req.params.id, function(err, result) {
    if (err != null) { return res.status(500).json({error: err}); }
    return res.status(200).json(partialResponse(result));
  })
;

// POST /api/bands
exports.create = function(req, res) {
  const userId = req.user._id;
  req.body.submitted_by = userId;
  return new Band(req.body).save(function(err, result) {
    if (err != null) { return res.status(500).json({error: err}); }
    req.params.id = result._id;
    // when creating a new band record simultaneously add a vote
    return voteForBand(req, res);
  });
};

// POST /api/bands/:id/vote
exports.vote = voteForBand = function(req, res) {
  const data = {
    parent: req.params.id,
    user_id: req.user._id,
    user_ip_address: getIpAddress(req.session.ipAddress)
  };
  return new Vote(data).save(function(err, result) {
    if (err != null) { return res.status(500).json({error: err}); }
    return res.status(200).json(partialResponse(result));
  });
};

// PUT /api/bands/:id
exports.update = (req, res) =>
  Band.update({_id: req.params.id}, req.body, function(err, count) {
    if (err != null) { return res.status(500).json({error: err}); }
    return res.status(200).json({message: `${count} records updated`});
  })
;

// DELETE /api/bands/:id
exports.delete = (req, res) =>
  Band.remove({_id: req.params.id}, function(err, count) {
    if (err != null) { return res.status(500).json({error: err}); }
    return res.status(200).json({message: `${count} records deleted`});
  })
;
