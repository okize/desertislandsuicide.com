const log = require('./logger').logger;

module.exports = {

  // ensure user has been authenticated
  isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    const err = new Error();
    err.status = 401;
    err.message = 'Authentication credentials are missing or incorrect';
    log.error(err);
    return res.status(401).json(err);
  },
};
