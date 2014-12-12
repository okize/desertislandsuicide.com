# compile coffeescript into js

path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
browserify = require 'browserify'
reactify = require 'coffee-reactify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
sourcemaps = require 'gulp-sourcemaps'

config = require '../config'
log = require '../helpers/log'
handleErrors = require '../helpers/handleErrors'

gulp.task 'javascript', ->
  log.info 'Bundling modules into javascript'
  browserify(
    entries: [path.join config.js.src, config.js.entry]
    extensions: ['.coffee']
    debug: true
  )
  .transform reactify
  .bundle()
  .on 'error', handleErrors
  .pipe source config.js.name
  .pipe buffer()
  .pipe sourcemaps.init(loadMaps: true)
  .pipe sourcemaps.write()
  .pipe gulp.dest config.js.dest
