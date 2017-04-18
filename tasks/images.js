// copies favicon from assets to public

let path = require('path');
let gulp = require('gulp');

let log = require('./helpers/log');
let config = require('../gulpconfig');

gulp.task('images', function() {
  log.info('Copying images to public folder');

  return gulp
    .src(`${config.images.src}/**/*`)
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('favicons', function() {
  log.info('Copying favicons public folder');

  return gulp
    .src(`${config.favicons.src}/**/*`)
    .pipe(gulp.dest(config.favicons.dest));
});
