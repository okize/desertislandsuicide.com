// deletes public asset directories

const gulp = require('gulp');
const clean = require('del');
const config = require('../gulpconfig');
const log = require('./helpers/log');

gulp.task('clean', () => {
  log.info('Deleting public assets');
  return clean([
    config.js.dest,
    config.css.dest,
    config.images.dest,
    config.favicons.dest,
  ]);
});
