# compile sass into css

path = require 'path'
gulp = require 'gulp'
sass = require 'gulp-sass'
sourcemaps = require 'gulp-sourcemaps'
autoprefixer = require 'gulp-autoprefixer'
rename = require 'gulp-rename'

config = require '../config'
log = require '../helpers/log'

gulp.task 'sass', ->
  log.info 'Compiling sass into css'
  gulp
    .src path.join(config.src.sassDir, config.src.sassEntry)
    .pipe sourcemaps.init()
    .pipe sass(
      onError: (e) -> log.error e
    )
    .pipe autoprefixer
      browsers: ['last 2 versions', 'Firefox >= 26', 'Explorer > 8']
      cascade: false
    .pipe sourcemaps.write()
    .pipe rename config.dist.cssName
    .pipe gulp.dest config.dist.cssDir
    .on 'error', (e) -> log.error e
