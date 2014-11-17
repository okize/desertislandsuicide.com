# deletes public asset directories

gulp = require 'gulp'
clean = require 'del'
config = require '../config'
log = require '../helpers/log'

gulp.task 'clean', ->
  log.info 'Deleting public assets'
  clean [config.dist.cssDir]
