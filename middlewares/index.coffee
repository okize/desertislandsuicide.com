path = require 'path'
_ = require 'lodash'
express = require 'express'
session = require 'express-session'
MongoStore = require('connect-mongo')(session)
lusca = require 'lusca'
bodyParser = require 'body-parser'
methodOverride = require 'method-override'
cookieParser = require 'cookie-parser'
assets = require 'express-asset-versions'
compression = require 'compression'
favicon = require 'serve-favicon'
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

exports.before = (app) ->

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

  # static assets
  app.use express.static(assetPath, maxAge: 86400000)
  app.use favicon path.join(assetPath, 'favicons', 'favicon.ico')
  app.use assets('', assetPath)

exports.after = (app) ->

  # error logger
  app.use logger.error

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
