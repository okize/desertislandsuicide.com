// watches asset files and triggers an asset recompile when changes are made

const path = require('path');
const gulp = require('gulp');
const watch = require('gulp-watch');

const config = require('../gulpconfig');
const log = require('./helpers/log');

// files to watch
const js = path.join(config.js.src, '**/**/*.{js,jsx}');
const css = path.join(config.css.src, '**/**/*.{sass,scss}');
const images = path.join(config.images.src, '**/**/*.svg');

gulp.task('watch', ['sync'], () => {
  log.info('Watching assets for changes...');
  watch(js, (files, cb) => gulp.start('js', cb));
  watch(css, (files, cb) => gulp.start('css', cb));
  watch(images, (files, cb) => gulp.start('images', cb));
});
