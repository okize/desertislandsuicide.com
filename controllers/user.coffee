User = require '../models/User'

# GET /login
exports.login = (req, res) ->
  if req.user
    res.redirect '/'
  res.render 'login',
    title: 'Login'

# GET /logout
exports.logout = (req, res) ->
  req.logout()
  res.redirect '/'
