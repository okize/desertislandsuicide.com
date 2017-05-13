const log = require('./log');

module.exports = function handleErrors(error) {
  log.error(error);
  this.emit('end');
};
