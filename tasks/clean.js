// deletes public asset directories

let gulp = require('gulp');
let clean = require('del');
let config = require('../gulpconfig');
let log = require('./helpers/log');

gulp.task('clean', function() {
  log.info('Deleting public assets');
  return clean([
    config.js.dest,
    config.css.dest,
    config.images.dest,
    config.favicons.dest
  ]);});
