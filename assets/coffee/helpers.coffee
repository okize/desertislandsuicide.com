# various helper functions

exports.getCsrfToken = () ->
  document.getElementById('csrf-token').getAttribute('content')
