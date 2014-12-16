# compile sass into css

path = require 'path'
gulp = require 'gulp'
sass = require 'gulp-sass'
cssBase64 = require 'gulp-css-base64'
sourcemaps = require 'gulp-sourcemaps'
autoprefixer = require 'gulp-autoprefixer'
rename = require 'gulp-rename'

config = require '../config'
log = require '../helpers/log'
handleErrors = require '../helpers/handleErrors'

sassOptions =
  outputStyle: 'nested' #compressed
  sourceComments: 'map'
  errLogToConsole: false
  onError: (e) -> log.error e
  onSuccess: () -> log.info 'Sass compiled without errors'

autoprefixerOptions =
  browsers: ['last 2 versions', 'Firefox >= 26', 'Explorer > 8']
  cascade: false

sourcemapOptions =
  debug: true

gulp.task 'css', ->
  log.info 'Compiling sass into css'
  gulp
    .src path.join(config.css.src, config.css.entry)
    .pipe sourcemaps.init sourcemapOptions
    .pipe sass sassOptions
    .pipe cssBase64()
    .pipe autoprefixer autoprefixerOptions
    .pipe rename config.css.name
    .pipe sourcemaps.write config.css.maps
    .pipe gulp.dest config.css.dest
    .on 'error', handleErrors
