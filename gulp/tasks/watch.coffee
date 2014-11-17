# watches asset files and triggers an asset recompile when changes are made

path = require 'path'
gulp = require 'gulp'
watch = require 'gulp-watch'

config = require '../config'
log = require '../helpers/log'

# files to watch
sass = path.join(config.src.sassDir, '**/*.{sass,scss}')

gulp.task 'watch', ['sync'], ->
  log.info 'Watching assets for changes...'

  watch sass, (files, cb) ->
    gulp.start 'sass', cb
  return
