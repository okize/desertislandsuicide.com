path = require 'path'
express = require 'express'
middlewares = require './middlewares'
routes = require './routes'

# init app
app = express()

# config
app.set 'app name', 'DesertIslandSuicide'
app.set 'port', process.env.PORT or 4444
app.set 'env', process.env.NODE_ENV or 'development'
app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'jade'

# middlewares
middlewares.before app

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

# await connections
app.listen app.get('port'), ->
  console.log "#{app.get('app name')} started on port #{app.get('port')} in [#{app.get('env')}]"
