// minifies static assets

let path = require('path');
let gulp = require('gulp');
let rename = require('gulp-rename');
let minifycss = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let size = require('gulp-size');
let sourcemaps = require('gulp-sourcemaps');

let config = require('../gulpconfig');
let log = require('./helpers/log');

gulp.task('minify', [
  'minify:js',
  'minify:css',
], () => log.info('Minification complete'));

let sourcemapOptions = {
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
    .on('error', e => log.error(e));
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
    .on('error', e => log.error(e));
});
