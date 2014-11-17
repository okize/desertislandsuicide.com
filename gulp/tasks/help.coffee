# list out registered tasks

path = require 'path'
gulp = require 'gulp'
taskListing = require 'gulp-task-listing'

log = require '../helpers/log'
config = require '../config'

gulp.task 'help', taskListing
