_ = require 'lodash'
passport = require 'passport'
FacebookStrategy = require('passport-facebook').Strategy
TwitterStrategy = require('passport-twitter').Strategy
GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
User = require '../models/user'
log = require('../lib/logger').logger

config =
  facebook:
    clientID: process.env.FACEBOOK_ID
    clientSecret: process.env.FACEBOOK_SECRET
    callbackURL: '/auth/facebook/callback'
    passReqToCallback: true
  twitter:
    consumerKey: process.env.TWITTER_KEY
    consumerSecret: process.env.TWITTER_SECRET
    callbackURL: '/auth/twitter/callback'
    passReqToCallback: true
  google:
    clientID: process.env.GOOGLE_ID
    clientSecret: process.env.GOOGLE_SECRET
    callbackURL: '/auth/google/callback'
    passReqToCallback: true

passport.serializeUser (user, done) ->
  log.info "Serialized #{user.tokens[0].kind} user"
  done null, user.id

passport.deserializeUser (id, done) ->
  User.findById id, (err, user) ->
    done err, user
  return

# sign in with Facebook
passport.use new FacebookStrategy(config.facebook, (req, accessToken, refreshToken, profile, done) ->
  if req.user
    User.findOne(facebook: profile.id, (err, existingUser) ->
      if existingUser
        req.flash 'errors',
          msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
        done err
      else
        User.findById req.user.id, (err, user) ->
          user.facebook = profile.id
          user.tokens.push
            kind: 'facebook'
            accessToken: accessToken
          user.profile.name = user.profile.name or profile.displayName
          user.profile.gender = user.profile.gender or profile._json.gender
          user.profile.picture = user.profile.picture or "https://graph.facebook.com/#{profile.id}/picture?type=large"
          user.save (err) ->
            req.flash 'info',
              msg: 'Facebook account has been linked.'
            done err, user
      )
  else
    User.findOne(facebook: profile.id, (err, existingUser) ->
      if existingUser
        return done(null, existingUser)
      User.findOne(email: profile._json.email, (err, existingEmailUser) ->
        if existingEmailUser
          req.flash 'errors',
            msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.'
          done err
        else
          user = new User()
          user.email = profile._json.email
          user.facebook = profile.id
          user.tokens.push
            kind: 'facebook'
            accessToken: accessToken
          user.profile.name = profile.displayName
          user.profile.gender = profile._json.gender
          user.profile.picture = "https://graph.facebook.com/#{profile.id}/picture?type=large"
          user.profile.location = (if (profile._json.location) then profile._json.location.name else '')
          user.save (err) ->
            done err, user
      )
    )
)

# sign in with Twitter
passport.use new TwitterStrategy(config.twitter, (req, accessToken, tokenSecret, profile, done) ->
  if req.user
    User.findOne(twitter: profile.id, (err, existingUser) ->
      if existingUser
        req.flash 'errors', msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
        done err
      else
        User.findById req.user.id, (err, user) ->
          user.twitter = profile.id
          user.tokens.push
            kind: 'twitter'
            accessToken: accessToken
            tokenSecret: tokenSecret
          user.profile.name = user.profile.name or profile.displayName
          user.profile.location = user.profile.location or profile._json.location
          user.profile.picture = user.profile.picture or profile._json.profile_image_url_https
          user.save (err) ->
            req.flash 'info',
              msg: 'Twitter account has been linked.'
            done err, user
    )
  else
    User.findOne(twitter: profile.id, (err, existingUser) ->
      if existingUser
        return done(null, existingUser)
      user = new User()
      user.email = "#{profile.username}@gmail.com" # fake email
      user.twitter = profile.id
      user.tokens.push
        kind: 'twitter'
        accessToken: accessToken
        tokenSecret: tokenSecret
      user.profile.name = profile.displayName
      user.profile.location = profile._json.location
      user.profile.picture = profile._json.profile_image_url_https
      user.save (err) ->
        done err, user
    )
)

# sign in with Google
passport.use new GoogleStrategy(config.google, (req, accessToken, refreshToken, profile, done) ->
  if req.user
    User.findOne(google: profile.id, (err, existingUser) ->
      if existingUser
        req.flash 'errors',
          msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
        done err
      else
        User.findById req.user.id, (err, user) ->
          user.google = profile.id
          user.tokens.push
            kind: 'google'
            accessToken: accessToken
          user.profile.name = user.profile.name or profile.displayName
          user.profile.gender = user.profile.gender or profile._json.gender
          user.profile.picture = user.profile.picture or profile._json.picture
          user.save (err) ->
            req.flash 'info',
              msg: 'Google account has been linked.'
            done err, user
    )
  else
    User.findOne(google: profile.id, (err, existingUser) ->
      if existingUser
        return done(null, existingUser)
      User.findOne(email: profile._json.email, (err, existingEmailUser) ->
        if existingEmailUser
          req.flash 'errors',
            msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.'
          done err
        else
          user = new User()
          user.email = profile._json.email
          user.google = profile.id
          user.tokens.push
            kind: 'google'
            accessToken: accessToken
          user.profile.name = profile.displayName
          user.profile.gender = profile._json.gender
          user.profile.picture = profile._json.picture
          user.save (err) ->
            done err, user
      )
    )
)

module.exports = passport