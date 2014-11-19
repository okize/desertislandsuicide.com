mongoose = require 'mongoose'
log = (require './logger').logger

# mongo connection string
mongoUri = process.env.MONGODB_URI or process.env.MONGODB

# init database connection
mongoose.connect mongoUri

# successful connection
mongoose.connection.on 'connected', ->
  log.info "Sucessful MongoDB connection to #{mongoUri}"

# connection error
mongoose.connection.on 'error', (err) ->
  log.error "MongoDB connection error: #{err}"

# disconnected connection
mongoose.connection.on 'disconnected', ->
  log.error 'MongoDB disconnected'

# nopde process ended so close the connection
process.on 'SIGINT', ->
  mongoose.connection.close ->
    log.info 'MongoDB disconnected through app termination'
    process.exit 0
