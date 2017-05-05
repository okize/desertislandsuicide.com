// open application in default browser

const path = require('path');
const gulp = require('gulp');
const open = require('gulp-open');

const log = require('./helpers/log');
const config = require('../gulpconfig');

gulp.task('open', () => {
  let port;
  log.info('Opening application in browser');
  if (process.env.NODE_ENV === 'development') {
    port = process.env.BROWSER_SYNC_PORT;
  } else {
    port = process.env.PORT;
  }
  const options =
    { url: `http://localhost:${port}` };

  return gulp
    .src(config.main)
    .pipe(open('', options));
});
