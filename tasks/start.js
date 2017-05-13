const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const sync = require('browser-sync');

const config = require('../gulpconfig');

// start up app with nodemon
gulp.task('start', () => {
  nodemon({
    script: config.app.main,
    ext: 'js',
    env: process.env,
    stdout: false,
    nodeArgs: [`--debug=${process.env.DEBUG_PORT || 5858}`],
    ignore: config.nodemon.ignore,
  })
  .on('readable', function onReadable() {
    this.stdout.pipe(process.stdout);
    return this.stderr.pipe(process.stderr);
  })
  .on('restart', () => {
    sync.reload({ stream: false });
  });
});
