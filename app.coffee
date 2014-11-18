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

# await connections
app.listen app.get('port'), ->
  console.log "#{app.get('app name')} started on port #{app.get('port')} in [#{app.get('env')}]"
