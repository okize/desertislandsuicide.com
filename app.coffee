require 'newrelic' if process.env.NODE_ENV == 'production' # this needs to be first line of app

path = require 'path'
express = require 'express'
middlewares = require './middlewares'
log = require('./lib/logger').logger

# init app
app = express()

# connect to db
db = require './lib/mongodb'

# config
app.set 'app name', 'DesertIslandSuicide'
app.set 'port', process.env.PORT or 4444
app.set 'env', process.env.NODE_ENV or 'development'
app.set 'views', path.join(__dirname, 'views')
app.set 'view engine', 'jade'

# init middlewares & routes
middlewares app

# await connections
app.listen app.get('port'), ->
  log.info "#{app.get('app name')} started on port #{app.get('port')} in [#{app.get('env')}]"

module.exports = app
