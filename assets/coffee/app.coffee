$ = require 'jquery'
request = require 'superagent'

$ ->

  # get list of bands
  request.get '/api/bands', (res) ->
    html = ''
    for band in res.body
      html += "<li>#{band.name}</li>"
    $('#bandList').append(html)

  # add a new band
  $('#submit-band').on 'submit', (e) ->
    e.preventDefault()
    request.post('/api/bands').send(
      name: $('#band-name').val()
    )
    .set('X-CSRF-Token', $('meta[property="csrf-token"]').val())
    .set('Accept', 'application/json')
    .end (error, res) ->
      return console.error if error?
      return console.log JSON.parse(res.text)
