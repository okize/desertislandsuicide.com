# db tasks

path = require 'path'
fs = require 'fs'
gulp = require 'gulp'
run = require 'gulp-run'
_ = require 'lodash'
argv = require('yargs').argv
moment = require 'moment'
mkdirp = require 'mkdirp'

config = require '../config'
log = require '../helpers/log'

getDateStamp = ->
  moment().format('YYYYMMDD-hhmmss')

gulp.task 'db:seed', ->
  console.log 'db seed'

# pass collection name as a flag
gulp.task 'db:create:seed', ->
  # arr of collection names based on model filenames
  collections = _.map fs.readdirSync('./models'), (f) -> f.replace('.coffee', 's')
  unless _.size(argv) == 3
    return log.error 'Pass name of collection to export as a flag.'
  collection = _.findKey argv, (v, k) -> v == true
  unless _.include(collections, collection)
    return log.error "Not a valid collection name; must be one of {#{collections.join(', ')}}"
  run("mongoexport -d desertislandsuicide -c #{collection} > #{config.db.seeds}/#{collection}.json").exec()
