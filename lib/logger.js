let winston = require('winston');
let expressWinston = require('express-winston');
require('winston-papertrail').Papertrail;

// console logging transport
let logToConsole =  new winston.transports.Console({
                  json: false,
                  colorize: true,
                  handleExceptions: true
                });

// papertrail app logging transport
let logToPapertrail = new winston.transports.Papertrail({
                    host: process.env.PAPERTRAIL_URL,
                    port: process.env.PAPERTRAIL_PORT,
                    hostname: process.env.PAPERTRAIL_HOSTNAME,
                    program: process.env.APP_NAME,
                    colorize: true
                  });

let transports = [logToConsole];

// only log to papertrail in production
if (process.env.NODE_ENV === 'production') {
  transports.push(logToPapertrail);
}

let logger = new winston.Logger({transports});

module.exports.http = expressWinston.logger({
  winstonInstance: logger,
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  expressFormat: false,
  colorStatus: true
});

module.exports.error = expressWinston.errorLogger({
  winstonInstance: logger,
  dumpExceptions: true,
  showStack: true
});

module.exports.logger = logger;
