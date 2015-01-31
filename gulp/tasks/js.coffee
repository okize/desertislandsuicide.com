# compile coffeescript into js

path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
browserify = require 'browserify'
reactify = require 'coffee-reactify'
source = require 'vinyl-source-stream'
buff = require 'vinyl-buffer'
sourcemaps = require 'gulp-sourcemaps'

config = require '../config'
log = require '../helpers/log'
handleErrors = require '../helpers/handleErrors'

browserifyOptions =
  entries: [path.join config.js.src, config.js.entry]
  extensions: ['.coffee', '.cjsx']
  debug: true

sourcemapOptions =
  loadMaps: true
  debug: true

gulp.task 'js', ->
  log.info 'Bundling coffeescript and modules into javascript'
  browserify browserifyOptions
  .on 'error', handleErrors
  .transform reactify
  .bundle()
  .pipe source config.js.name
  .pipe buff()
  .pipe sourcemaps.init sourcemapOptions
  .pipe sourcemaps.write config.js.maps
  .pipe gulp.dest config.js.dest
