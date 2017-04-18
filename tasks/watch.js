// watches asset files and triggers an asset recompile when changes are made

let path = require('path');
let gulp = require('gulp');
let watch = require('gulp-watch');

let config = require('../gulpconfig');
let log = require('./helpers/log');

// files to watch
let js = path.join(config.js.src, '**/**/*.{js,jsx}');
let css = path.join(config.css.src, '**/**/*.{sass,scss}');
let images = path.join(config.images.src, '**/**/*.svg');

gulp.task('watch', ['sync'], function() {
  log.info('Watching assets for changes...');

  watch(js, (files, cb) => gulp.start('js', cb));

  watch(css, (files, cb) => gulp.start('css', cb));

  watch(images, (files, cb) => gulp.start('images', cb));

});
