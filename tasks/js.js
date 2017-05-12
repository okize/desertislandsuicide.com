const path = require('path');
const gulp = require('gulp');
const browserify = require('browserify');
// const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buff = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

const config = require('../gulpconfig');
const log = require('./helpers/log');
const handleErrors = require('./helpers/handleErrors');

const browserifyOptions = {
  entries: [path.join(config.js.src, config.js.entry)],
  extensions: ['.js', '.jsx'],
  debug: true,
};

const sourcemapOptions = {
  loadMaps: true,
  debug: true,
};

// compile es6 into js
gulp.task('js', () => {
  log.info('Bundling ES6 and modules into javascript');
  return browserify(browserifyOptions)
  .on('error', handleErrors)
  .transform('babelify', {
    presets: ['latest', 'react'],
    plugins: ['babel-plugin-transform-class-properties'],
  })
  .bundle()
  .pipe(source(config.js.name))
  .pipe(buff())
  .pipe(sourcemaps.init(sourcemapOptions))
  .pipe(sourcemaps.write(config.js.maps))
  .pipe(gulp.dest(config.js.dest));
});
