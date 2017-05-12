const gulp = require('gulp');

const log = require('./helpers/log');
const config = require('../gulpconfig');

// copies images from assets to public
gulp.task('images', () => {
  log.info('Copying images to public folder');

  return gulp
    .src(`${config.images.src}/**/*`)
    .pipe(gulp.dest(config.images.dest));
});

// copies favicon from assets to public
gulp.task('favicons', () => {
  log.info('Copying favicons public folder');

  return gulp
    .src(`${config.favicons.src}/**/*`)
    .pipe(gulp.dest(config.favicons.dest));
});
