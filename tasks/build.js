// builds front-end assets
const gulp = require('gulp');
const run = require('run-sequence');

const log = require('./helpers/log');

gulp.task('build', (done) => {
  log.info('Building static assets');
  return run('clean', 'js', 'css', 'favicons', 'images', 'minify', done);
});
