# open application in default browser

path = require 'path'
gulp = require 'gulp'
open = require 'gulp-open'

log = require '../helpers/log'
config = require '../config'

gulp.task 'open', ->
  log.info 'Opening application in browser'
  if (process.env.NODE_ENV == 'development')
    port = process.env.BROWSER_SYNC_PORT
  else
    port = process.env.PORT
  options =
    url: "http://localhost:#{port}"

  gulp
    .src config.main
    .pipe open('', options)
