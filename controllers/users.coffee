User = require '../models/user'

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

# GET /account
exports.account = (req, res) ->
  res.render 'account',
    title: 'Account'
