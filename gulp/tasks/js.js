// compile es6 into js

let path = require('path');
let gulp = require('gulp');
let gutil = require('gulp-util');
let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let buff = require('vinyl-buffer');
let sourcemaps = require('gulp-sourcemaps');

let config = require('../config');
let log = require('../helpers/log');
let handleErrors = require('../helpers/handleErrors');

let browserifyOptions = {
  entries: [path.join(config.js.src, config.js.entry)],
  extensions: ['.js', '.jsx'],
  debug: true
};

let sourcemapOptions = {
  loadMaps: true,
  debug: true
};

gulp.task('js', function() {
  log.info('Bundling ES6 and modules into javascript');
  return browserify(browserifyOptions)
  .on('error', handleErrors)
  .transform('babelify', { presets: [
    'es2015',
    'react'
  ]
})
  .bundle()
  .pipe(source(config.js.name))
  .pipe(buff())
  .pipe(sourcemaps.init(sourcemapOptions))
  .pipe(sourcemaps.write(config.js.maps))
  .pipe(gulp.dest(config.js.dest));
});
