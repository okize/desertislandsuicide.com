$ = require 'jquery'
request = require 'superagent'

React   = require 'react'
BandBox = require './components/BandBox.cjsx'

refreshRate = 5000

React.render(
  React.createElement(BandBox, pollInterval: refreshRate),
  document.getElementById 'bandList'
)

$ ->
  # add a new band
  $('#submit-band').on 'submit', (e) ->
    e.preventDefault()
    request.post('/api/bands').send(
      name: $('#band-name').val()
    )
    .set('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
    .set('Accept', 'application/json')
    .end (error, res) ->
      return console.error if error?
      return console.log JSON.parse(res.text)
