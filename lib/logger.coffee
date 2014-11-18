winston = require 'winston'
expressWinston = require 'express-winston'

logger = new winston.Logger(transports: [
  new winston.transports.Console(
    json: false
    colorize: true
    handleExceptions: true
  )
])

module.exports.http = expressWinston.logger(
  winstonInstance: logger
  meta: false
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms"
  expressFormat: false
  colorStatus: true
)

module.exports.error = expressWinston.errorLogger(
  winstonInstance: logger
  dumpExceptions: true
  showStack: true
)

module.exports.logger = logger
