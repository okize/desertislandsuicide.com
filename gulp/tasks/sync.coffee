# run application through a browser-sync proxy so that
# the browser refreshes when front-end asset files change

gulp = require 'gulp'
sync = require 'browser-sync'

config = require '../config'
log = require '../helpers/log'

gulp.task 'sync', ->
  log.info 'Starting browser-sync proxy'
  sync
    proxy: "localhost:#{process.env.PORT}"
    port: process.env.BROWSER_SYNC_PORT
    open: false
    files: ["#{config.gulp.publicAssets}/**/*.{js,css}", './views/**/*.pug']
