winston = require 'winston'
expressWinston = require 'express-winston'
require('winston-papertrail').Papertrail

# console logging transport
logToConsole =  new winston.transports.Console(
                  json: false
                  colorize: true
                  handleExceptions: true
                )

# papertrail app logging transport
logToPapertrail = new winston.transports.Papertrail(
                    host: process.env.PAPERTRAIL_URL
                    port: process.env.PAPERTRAIL_PORT
                    hostname: process.env.PAPERTRAIL_HOSTNAME
                    program: process.env.APP_NAME
                    colorize: true
                  )

transports = [logToConsole]

# only log to papertrail in production
if process.env.NODE_ENV == 'production'
  transports.push logToPapertrail

logger = new winston.Logger(transports: transports)

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
