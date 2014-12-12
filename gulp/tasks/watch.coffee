# watches asset files and triggers an asset recompile when changes are made

path = require 'path'
gulp = require 'gulp'
watch = require 'gulp-watch'

config = require '../config'
log = require '../helpers/log'

# files to watch
javascript = path.join(config.js.src, '**/**/*.{coffee,cjsx,js}')
css = path.join(config.css.src, '**/*.{sass,scss}')

gulp.task 'watch', ['sync'], ->
  log.info 'Watching assets for changes...'

  watch javascript, (files, cb) ->
    gulp.start 'javascript', cb

  watch css, (files, cb) ->
    gulp.start 'css', cb

  return
