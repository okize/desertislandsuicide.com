// open application in default browser

let path = require('path');
let gulp = require('gulp');
let open = require('gulp-open');

let log = require('./helpers/log');
let config = require('../gulpconfig');

gulp.task('open', function() {
  let port;
  log.info('Opening application in browser');
  if (process.env.NODE_ENV === 'development') {
    port = process.env.BROWSER_SYNC_PORT;
  } else {
    port = process.env.PORT;
  }
  let options =
    {url: `http://localhost:${port}`};

  return gulp
    .src(config.main)
    .pipe(open('', options));
});
