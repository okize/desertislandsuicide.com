// run application through a browser-sync proxy so that
// the browser refreshes when front-end asset files change

const gulp = require('gulp');
const sync = require('browser-sync');

const config = require('../gulpconfig');
const log = require('./helpers/log');

gulp.task('sync', () => {
  log.info('Starting browser-sync proxy');
  return sync({
    proxy: `localhost:${process.env.PORT}`,
    port: process.env.BROWSER_SYNC_PORT,
    open: false,
    files: [`${config.gulp.publicAssets}/**/*.{js,css}`, './views/**/*.pug'] });
});
