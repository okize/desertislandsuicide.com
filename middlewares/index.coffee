path = require 'path'
_ = require 'lodash'
express = require 'express'
session = require 'express-session'
MongoStore = require('connect-mongo')(session)
lusca = require 'lusca'
passport = require 'passport'
bodyParser = require 'body-parser'
methodOverride = require 'method-override'
cookieParser = require 'cookie-parser'
assets = require 'express-asset-versions'
compression = require 'compression'
flash = require 'express-flash'
favicon = require 'serve-favicon'
help = require '../lib/helpers'
routes = require '../routes'
logger = require '../lib/logger'
log = logger.logger

# public assets directory
assetPath = path.join(__dirname, '..', 'public')

# if app is running in dev mode, pass through entire stack trace
# otherwise return an empty object
getErrorStack = (err, env) ->
  if env is 'development'
    err
  else
    {}

module.exports = (app) ->

  # gzip assets
  app.use compression(threshold: 1024)

  # http logger
  app.use logger.http

  # parsers
  app.use bodyParser.json()
  app.use bodyParser.urlencoded(extended: true)
  app.use methodOverride()
  app.use cookieParser()

  # session init
  app.use session(
    secret: process.env.SESSION_SECRET
    resave: true
    saveUninitialized: true
    store: new MongoStore(
      url: process.env.MONGODB_URI or process.env.MONGODB
      auto_reconnect: true
    )
  )

  # webapp security defaults
  app.use lusca(
    csrf: true
    csp: false
    xframe: 'SAMEORIGIN'
    p3p: false
    hsts: false
    xssProtection: true
  )

  # init passport authentication
  app.use passport.initialize()
  app.use passport.session()

  # flash messages
  app.use flash()

  # # save original destination before login
  # app.use (req, res, next) ->
  #   path = req.path.split("/")[1]
  #   if /auth|login|logout|signup|fonts|favicon/i.test(path)
  #     return next()
  #   req.session.returnTo = req.path
  #   next()

  # make user object available in templates
  app.use (req, res, next) ->
    res.locals.user = req.user
    next()

  # static assets
  app.use express.static(assetPath, maxAge: 86400000)
  app.use favicon path.join(assetPath, 'favicons', 'favicon.ico')
  app.use assets('', assetPath)

  # init routes
  app.use '/', routes.unprotected
  app.use '/api', help.isAuthenticated, routes.protected

  # catch 404s
  app.use (req, res, next) ->
    err = new Error('Not Found')
    err.status = 404
    next err

  # error handlers
  app.use (err, req, res, next) ->
    log.error err if err
    res.status err.status or 500
    res.render 'error',
      message: err.message
      error: getErrorStack err, app.get('env')

  # error logger
  app.use logger.error
