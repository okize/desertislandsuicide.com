$ = require 'jquery'
request = require 'superagent'

$ ->
  request.get '/api/bands', (res) ->
    html = ''
    for band in res.body
      html += "<li>#{band.name}</li>"
    $('#bandList').append(html)
