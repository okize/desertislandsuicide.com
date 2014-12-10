# compile coffeescript into js

path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
browserify = require 'browserify'
coffeeify = require 'coffeeify'
source = require 'vinyl-source-stream'
buffer = require 'vinyl-buffer'
sourcemaps = require 'gulp-sourcemaps'

config = require '../config'
log = require '../helpers/log'

gulp.task 'browserify', ->
  log.info 'Bundling modules into javascript'
  browserify(
    entries: [path.join(config.src.coffeeDir, config.src.coffeeEntry)]
    extensions: ['.coffee']
    debug: true
  )
  .transform coffeeify
  .bundle()
  .pipe source config.dist.jsName
  .pipe buffer()
  .pipe sourcemaps.init(loadMaps: true)
  .pipe sourcemaps.write()
  .pipe gulp.dest config.dist.jsDir
  .on 'error', (e) -> log.error e
