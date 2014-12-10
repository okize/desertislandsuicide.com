# watches asset files and triggers an asset recompile when changes are made

path = require 'path'
gulp = require 'gulp'
watch = require 'gulp-watch'

config = require '../config'
log = require '../helpers/log'

# files to watch
sass = path.join(config.src.sassDir, '**/*.{sass,scss}')
coffee = path.join(config.src.coffeeDir, '**/*.{coffee,js}')

gulp.task 'watch', ['sync'], ->
  log.error coffee

  log.info 'Watching assets for changes...'

  watch coffee, (files, cb) ->
    gulp.start 'browserify', cb

  watch sass, (files, cb) ->
    gulp.start 'sass', cb

  return
