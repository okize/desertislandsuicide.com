// minifies static assets

const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const minifycss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');

const config = require('../gulpconfig');
const log = require('./helpers/log');

gulp.task('minify', [
  'minify:js',
  'minify:css',
], () => log.info('Minification complete'));

const sourcemapOptions = {
  loadMaps: true,
  debug: true,
};

gulp.task('minify:js', () => {
  log.info('Minifying js');
  return gulp
    .src(path.join(config.js.dest, config.js.name))
    .pipe(size({ title: 'js before' }))
    .pipe(sourcemaps.init(sourcemapOptions))
    .pipe(uglify())
    .pipe(size({ title: 'js after' }))
    .pipe(size({ title: 'js after gzip', gzip: true }))
    .pipe(rename((file) => {
      if (file.extname !== '.map') {
        file.basename += '.min';
      }
    }))
    .pipe(sourcemaps.write(config.js.maps))
    .pipe(gulp.dest(config.js.dest))
    .on('error', err => log.error(err));
});

gulp.task('minify:css', () => {
  log.info('Minifying css');
  return gulp
    .src(path.join(config.css.dest, config.css.name))
    .pipe(size({ title: 'css before' }))
    .pipe(sourcemaps.init(sourcemapOptions))
    .pipe(minifycss())
    .pipe(size({ title: 'css after' }))
    .pipe(size({ title: 'css after gzip', gzip: true }))
    .pipe(rename((file) => {
      if (file.extname !== '.map') {
        file.basename += '.min';
      }
    }))
    .pipe(sourcemaps.write(config.css.maps))
    .pipe(gulp.dest(config.css.dest))
    .on('error', err => log.error(err));
});
