path = require 'path'
express = require 'express'
assets = require 'express-asset-versions'
compression = require 'compression'
favicon = require 'serve-favicon'
logger = require 'morgan'

exports.before = (app) ->

  # gzip assets
  app.use compression(threshold: 1024)

  # logger
  app.use logger('dev')

  # static assets
  assetPath = path.join(__dirname, '..', 'public')
  app.use express.static(assetPath, maxAge: 86400000)
  app.use favicon path.join(assetPath, 'favicons', 'favicon.ico')
  app.use assets('', assetPath)

  # catch 404s
  app.use (req, res, next) ->
    err = new Error('Not Found')
    err.status = 404
    next err

  # error handlers in dev
  if app.get('env') is 'development'
    app.use (err, req, res, next) ->
      res.status err.status or 500
      res.render 'error',
        message: err.message
        error: err

  # error handlers in production
  if app.get('env') is 'production'
    app.use (err, req, res, next) ->
      res.status err.status or 500
      res.render 'error',
        message: err.message
        error: {}
