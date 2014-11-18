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
