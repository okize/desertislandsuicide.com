// run a node debugger

let path = require('path');
let gulp = require('gulp');
let bg = require('gulp-bg');

let config = require('../gulpconfig');
let log = require('./helpers/log');

gulp.task('debug', () => {
  log.info('Starting debugging session');
  return bg('./node_modules/.bin/node-debug', config.app.main);
});
