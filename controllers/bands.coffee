_ = require 'lodash'
Band = require '../models/band'

# GET /api/bands
exports.index = (req, res) ->
  Band.find().sort(created_at: 'descending').exec(
    (err, results) ->
      res.status(500).json error: err if err?
      res.status(200).json results
  )

# GET /api/bands/:id
exports.show = (req, res) ->
  Band.findById req.params.id, (err, result) ->
    res.status(500).json error: err if err?
    res.status(200).json results

# POST /api/bands
exports.create = (req, res) ->
  data = _.merge {}, req.body, {submitted_by: req.user._id}
  new Band(data)
    .save (err, results) ->
      res.status(500).json error: err if err?
      res.status(200).json results

# PUT /api/bands/:id
exports.update = (req, res) ->
  Band.update {_id: req.params.id}, req.body, (err, count) ->
    res.status(500).json error: err if err?
    res.status(200).json message: "#{count} records updated"

# DELETE /api/bands/:id
exports.delete = (req, res) ->
  Band.remove {_id: req.params.id}, (err, count) ->
    res.status(500).json error: err if err?
    res.status(200).json message: "#{count} records deleted"
