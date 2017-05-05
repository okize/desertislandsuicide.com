// copies favicon from assets to public

const path = require('path');
const gulp = require('gulp');

const log = require('./helpers/log');
const config = require('../gulpconfig');

gulp.task('images', () => {
  log.info('Copying images to public folder');

  return gulp
    .src(`${config.images.src}/**/*`)
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('favicons', () => {
  log.info('Copying favicons public folder');

  return gulp
    .src(`${config.favicons.src}/**/*`)
    .pipe(gulp.dest(config.favicons.dest));
});
