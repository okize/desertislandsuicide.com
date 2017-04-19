// compile sass into css

let path = require('path');
let gulp = require('gulp');
let sass = require('gulp-sass');
let cssBase64 = require('gulp-css-base64');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let rename = require('gulp-rename');

let config = require('../gulpconfig');
let log = require('./helpers/log');
let handleErrors = require('./helpers/handleErrors');

let sassOptions = {
  outputStyle: 'nested', // compressed
  sourceComments: 'map',
  errLogToConsole: false,
  onError(err) { return log.error(err); },
  onSuccess() { return log.info('Sass compiled without errors'); },
};

let autoprefixerOptions = {
  browsers: ['last 2 versions', 'Firefox >= 26', 'Explorer > 8'],
  cascade: false,
};

let sourcemapOptions =
  { debug: true };

gulp.task('css', () => {
  log.info('Compiling sass into css');
  return gulp
    .src(path.join(config.css.src, config.css.entry))
    .pipe(sourcemaps.init(sourcemapOptions))
    .pipe(sass(sassOptions))
    .pipe(cssBase64())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(rename(config.css.name))
    .pipe(sourcemaps.write(config.css.maps))
    .pipe(gulp.dest(config.css.dest))
    .on('error', handleErrors);
});
