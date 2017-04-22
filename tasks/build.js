// builds front-end assets
let gulp = require('gulp');
let run = require('run-sequence');

let log = require('./helpers/log');

gulp.task('build', (done) => {
  log.info('Building static assets');
  return run('clean', 'js', 'css', 'favicons', 'images', 'minify', done);
});
