log = require('./logger').logger

module.exports =

  # ensure user has been authenticated
  isAuthenticated: (req, res, next) ->
    if req.isAuthenticated()
      next()
    else
      err = new Error
      err.status = 401
      err.message = 'Authentication credentials are missing or incorrect'
      log.error err
      res.status(401).json err
