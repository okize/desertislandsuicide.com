# minifies static assets

path = require 'path'
gulp = require 'gulp'
rename = require 'gulp-rename'
minifycss = require 'gulp-minify-css'
uglify = require 'gulp-uglifyjs'
size = require 'gulp-size'

config = require '../config'
log = require '../helpers/log'

gulp.task 'minify', [
  'minify-js',
  'minify-css'
], ->
  log.info 'Minification complete'

gulp.task 'minify-js', ->
  log.info 'Minifying js'
  gulp
    .src path.join(config.js.dest, config.js.name)
    .pipe size(title: 'js before')
    .pipe(uglify())
    .pipe size(title: 'js after')
    .pipe size(title: 'js after gzip', gzip: true)
    .pipe rename(suffix: '.min')
    .pipe gulp.dest config.js.dest
    .on 'error', (e) -> log.error e

gulp.task 'minify-css', ->
  log.info 'Minifying css'
  gulp
    .src path.join(config.css.dest, config.css.name)
    .pipe size(title: 'css before')
    .pipe minifycss()
    .pipe size(title: 'css after')
    .pipe size(title: 'css after gzip', gzip: true)
    .pipe rename(suffix: '.min')
    .pipe gulp.dest config.css.dest
    .on 'error', (e) -> log.error e
