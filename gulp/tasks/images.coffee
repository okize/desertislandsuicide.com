# copies favicon from assets to public

path = require 'path'
gulp = require 'gulp'

log = require '../helpers/log'
config = require '../config'

gulp.task 'images', ->
  log.info 'Copying favicons & images to public folder'

  gulp
    .src "#{config.src.images}/**/*"
    .pipe gulp.dest "#{config.publicAssetsDir}/images"

  gulp
    .src "#{config.src.favicons}/**/*"
    .pipe gulp.dest "#{config.publicAssetsDir}/favicons"
