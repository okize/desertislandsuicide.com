# various helper functions

exports.getCsrfToken = () ->
  document.getElementsByTagName('meta')['csrf-token'].getAttribute('content')
