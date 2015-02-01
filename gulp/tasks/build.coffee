# builds front-end assets

gulp = require 'gulp'
run = require 'run-sequence'

log = require '../helpers/log'

gulp.task 'build', (done) ->
  log.info 'Building static assets'
  run(
    'clean'
    ['css', 'js', 'images', 'favicons']
    'minify'
    done
  )