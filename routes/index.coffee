express = require 'express'
router = express.Router()
api = express.Router()
passport = require 'passport'
auth = require '../lib/authentication'
homeController = require '../controllers/home'
userController = require '../controllers/users'
bandsController = require '../controllers/bands'

# "account" page (temp)
api.get '/account', userController.account

# homepage
router.get '/', homeController.index

# this exists out of protected group because we want unauthorized
# users to be able to see band submissions and vote counts
router.get '/bandsNoAuth', bandsController.indexNoAuth

# sign in & out
router.get '/login', userController.login
router.get '/logout', userController.logout

# facebook OAuth
router.get '/auth/facebook', passport.authenticate('facebook',
  scope: ['email', 'user_location']
)
router.get '/auth/facebook/callback', passport.authenticate('facebook',
  failureRedirect: '/'
), (req, res) ->
  res.redirect req.session.returnTo or '/'

# google OAuth
router.get '/auth/google', passport.authenticate('google',
  scope: 'profile email'
)
router.get '/auth/google/callback', passport.authenticate('google',
  failureRedirect: '/'
), (req, res) ->
  res.redirect req.session.returnTo or '/'

# twitter OAuth
router.get '/auth/twitter', passport.authenticate('twitter')
router.get '/auth/twitter/callback', passport.authenticate('twitter',
  failureRedirect: '/'
), (req, res) ->
  res.redirect req.session.returnTo or '/'

api.get '/bands', bandsController.index
api.post '/bands', bandsController.create
api.get '/bands/:id', bandsController.show
api.post '/bands/:id/vote', bandsController.vote
api.put '/bands/:id', bandsController.update
api.delete '/bands/:id', bandsController.delete

module.exports =
  unprotected: router
  protected: api
