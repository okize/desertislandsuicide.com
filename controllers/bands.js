let voteForBand;
let _ = require('lodash');
let mask = require('json-mask');
let Band = require('../models/band');
let Vote = require('../models/vote');

const WHITELIST = [
  '_id',
  'name',
  'parent',
  'vote_count',
  'userHasVotedFor'
].join(',');

// removes data that shouldn't be returned in json
let partialResponse = json => mask(json, WHITELIST);

// returns ip address
let getIpAddress = function(ipObj) {
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
  let userId = req.user._id.toString();
  let pop = {
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
        let newResult = _.map(result, function(obj) {
          let userVotes = obj.users_who_voted_for;
          let hasVoted = userVotes.includes(userId) ? true : false;
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
  let userId = req.user._id;
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
  let data = {
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
