const gulp = require('gulp');
const bg = require('gulp-bg');

const config = require('../gulpconfig');
const log = require('./helpers/log');

// run a node debugger
gulp.task('debug', () => {
  log.info('Starting debugging session');
  return bg('./node_modules/.bin/node-debug', config.app.main);
});
