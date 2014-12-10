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
  'minify-css',
  'minify-js'
], ->
  log.info 'Minification complete'

gulp.task 'minify-css', ->
  log.info 'Minifying css'
  gulp
    .src path.join(config.dist.cssDir, config.dist.cssName)
    .pipe size(title: 'css before')
    .pipe minifycss()
    .pipe size(title: 'css after')
    .pipe size(title: 'css after gzip', gzip: true)
    .pipe rename(suffix: '.min')
    .pipe gulp.dest config.dist.cssDir
    .on 'error', (e) -> log.error e

gulp.task 'minify-js', ->
  log.info 'Minifying js'
  gulp
    .src path.join(config.dist.jsDir, config.dist.jsName)
    .pipe size(title: 'js before')
    .pipe(uglify())
    .pipe size(title: 'css after')
    .pipe size(title: 'css after gzip', gzip: true)
    .pipe rename(suffix: '.min')
    .pipe(gulp.dest(config.dist.jsDir))
    .on 'error', (e) -> log.error e
