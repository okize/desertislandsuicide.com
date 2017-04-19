let log = require('./log');

module.exports = function (error) {
  log.error(error);
  this.emit('end');
};
