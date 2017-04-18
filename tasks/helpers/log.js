// small wrapper for gulp logging
let gutil = require('gulp-util');
let _ = require('lodash');
let prettyHrtime = require('pretty-hrtime');
let startTime = undefined;

module.exports = {

  // info logging
  info(msg) {
    return gutil.log(gutil.colors.blue(msg));
  },

  // error logging
  error(err) {
    if (err.name && err.stack) {
      err = gutil.colors.red(`${err.plugin}: ${err.name}: `) +
            gutil.colors.bold.red(`${err.message}`) +
            `\n${err.stack}`;
    }
    return gutil.log(err);
  },

  // start logging with timer
  start(msg) {
    startTime = process.hrtime();
    return gutil.log(gutil.colors.blue(msg));
  },

  // displays task time since timer started
  end(task) {
    let taskTime = prettyHrtime(process.hrtime(startTime));
    return gutil.log('Finished', gutil.colors.cyan(task),
              'after', gutil.colors.magenta(taskTime));
  }
};
