# run a node debugger

path = require 'path'
gulp = require 'gulp'
bg = require 'gulp-bg'

config = require '../config'
log = require '../helpers/log'

gulp.task 'debug', ->
  log.info 'Starting debugging session'
  bg './node_modules/.bin/node-debug', config.app.main
