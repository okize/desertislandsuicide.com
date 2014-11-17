path = require('path')
express = require('express')
assets = require('express-asset-versions')
favicon = require('serve-favicon')
logger = require('morgan')
routes = require('./routes')

# init app
app = express()

# port config
app.set 'port', process.env.PORT or 4444

# view engine
app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'jade'

# logger
app.use logger('dev')

# static assets
assetPath = path.join(__dirname, 'public')
app.use express.static(assetPath,
  maxAge: 86400000
)
app.use favicon(path.join(assetPath, 'favicons', 'favicon.ico'))
app.use assets('', assetPath)

# routes
app.use '/', routes

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

app.listen app.get('port'), ->
  console.log "Express server listening on port #{app.get('port')}"
