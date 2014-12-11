# copies favicon from assets to public

path = require 'path'
gulp = require 'gulp'

log = require '../helpers/log'
config = require '../config'

gulp.task 'images', ->
  log.info 'Copying images to public folder'

  gulp
    .src "#{config.images.src}/**/*"
    .pipe gulp.dest config.images.dest

gulp.task 'favicons', ->
  log.info 'Copying favicons public folder'

  gulp
    .src "#{config.favicons.src}/**/*"
    .pipe gulp.dest config.favicons.dest
