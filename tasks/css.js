// compile sass into css

const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssBase64 = require('gulp-css-base64');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

const config = require('../gulpconfig');
const log = require('./helpers/log');
const handleErrors = require('./helpers/handleErrors');

const sassOptions = {
  outputStyle: 'nested', // compressed
  sourceComments: 'map',
  errLogToConsole: false,
  onError(err) { return log.error(err); },
  onSuccess() { return log.info('Sass compiled without errors'); },
};

const autoprefixerOptions = {
  browsers: ['last 2 versions', 'Firefox >= 26', 'Explorer > 8'],
  cascade: false,
};

const sourcemapOptions =
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
