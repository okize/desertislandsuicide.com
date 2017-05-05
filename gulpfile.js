// this file boostraps all the gulp tasks

// load env vars here so they'll be available to all gulp tasks
require('dotenv').load();

// ensure that env variables required for the application to run have been set
require('dotenv-assert')();

const config = require('./gulpconfig');
const tasks = require('./tasks/helpers/getTaskList');

// load all the gulp task modules
tasks().forEach((task) => {
  require(`${config.gulp.src}${task}`); // eslint-disable-line import/no-dynamic-require, global-require
});
