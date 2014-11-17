# starts up the application with nodemon
# and loads environment variables from .env

path = require 'path'
gulp = require 'gulp'
nodemon = require 'gulp-nodemon'
sync = require 'browser-sync'

log = require '../helpers/log'
config = require '../config'

gulp.task 'start', ->
  log.info 'Starting application server'
  nodemon(
    script: config.main
    ext: 'coffee'
    env: process.env
    nodeArgs: ['--nodejs', "--debug=#{process.env.DEBUG_PORT or 5858}"]
    ignore: config.appIgnoreDirs
  ).on('restart', (files) ->
    log.info 'Application restarted'
    sync.reload(stream:false)
  ).on('quit', ->
    log.info 'Application closed'
  )
