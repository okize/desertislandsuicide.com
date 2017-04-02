# start up app with nodemon

path = require 'path'
gulp = require 'gulp'
nodemon = require 'gulp-nodemon'
sync = require 'browser-sync'

config = require '../config'

gulp.task 'start', ->
  nodemon(
    script: config.app.main
    ext: 'js'
    env: process.env
    stdout: false
    nodeArgs: ["--debug=#{process.env.DEBUG_PORT or 5858}"]
    ignore: config.nodemon.ignore
  ).on('readable', ->
    @stdout.pipe process.stdout
    @stderr.pipe process.stderr
  ).on('restart', (files) ->
    sync.reload(stream:false)
  )
