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

# sign in & out
router.get '/login', userController.login
router.get '/logout', userController.logout

# facebook OAuth
router.get '/auth/facebook', passport.authenticate('facebook',
  scope: ['email', 'user_location']
)
router.get '/auth/facebook/callback', passport.authenticate('facebook',
  failureRedirect: '/login'
), (req, res) ->
  res.redirect req.session.returnTo or '/'

# google OAuth
router.get '/auth/google', passport.authenticate('google',
  scope: 'profile email'
)
router.get '/auth/google/callback', passport.authenticate('google',
  failureRedirect: '/login'
), (req, res) ->
  res.redirect req.session.returnTo or '/'

# twitter OAuth
router.get '/auth/twitter', passport.authenticate('twitter')
router.get '/auth/twitter/callback', passport.authenticate('twitter',
  failureRedirect: '/login'
), (req, res) ->
  res.redirect req.session.returnTo or '/'

# this exists out of protected group because we want unsigned
# in users to be able to see votes
router.get '/api/bands', bandsController.index

api.get '/bands/:id', bandsController.show
api.post '/bands', bandsController.create
api.post '/bands/:id/vote', bandsController.vote
api.put '/bands/:id', bandsController.update
api.delete '/bands/:id', bandsController.delete

module.exports =
  unprotected: router
  protected: api
