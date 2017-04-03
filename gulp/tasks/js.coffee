# compile es6 into js

path = require 'path'
gulp = require 'gulp'
gutil = require 'gulp-util'
browserify = require 'browserify'
babelify = require 'babelify'
source = require 'vinyl-source-stream'
buff = require 'vinyl-buffer'
sourcemaps = require 'gulp-sourcemaps'

config = require '../config'
log = require '../helpers/log'
handleErrors = require '../helpers/handleErrors'

browserifyOptions =
  entries: [path.join config.js.src, config.js.entry]
  extensions: ['.js', '.jsx']
  debug: true

sourcemapOptions =
  loadMaps: true
  debug: true

gulp.task 'js', ->
  log.info 'Bundling ES6 and modules into javascript'
  browserify browserifyOptions
  .on 'error', handleErrors
  .transform('babelify', presets: [
    'es2015'
    'react'
  ])
  .bundle()
  .pipe source config.js.name
  .pipe buff()
  .pipe sourcemaps.init sourcemapOptions
  .pipe sourcemaps.write config.js.maps
  .pipe gulp.dest config.js.dest
