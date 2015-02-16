# various helper functions
_ = require 'lodash'

exports.getCsrfToken = () ->
  token = ''
  metas = document.getElementsByTagName('meta')
  _.each metas, (el) ->
    if (el.getAttribute('name') == 'csrf-token')
      token = el.getAttribute('content')
  token
