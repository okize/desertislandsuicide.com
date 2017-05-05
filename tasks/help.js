// list out registered tasks

const path = require('path');
const gulp = require('gulp');
const taskListing = require('gulp-task-listing');

const log = require('./helpers/log');
const config = require('../gulpconfig');

gulp.task('help', taskListing);
