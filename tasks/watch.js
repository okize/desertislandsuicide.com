// watches asset files and triggers an asset recompile when changes are made
const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const config = require('../gulpconfig');
const log = require('./helpers/log');

// files to watch
const js = path.join(config.js.src, '**/*.{js,jsx}');
const css = path.join(config.css.src, '**/*.{sass,scss}');
const images = path.join(config.images.src, '**/*.svg');

// run application through a browser-sync proxy so that
// the browser refreshes when front-end asset files change
gulp.task('watch', ['css', 'js', 'images'], () => {
  log.info('Watching assets for changes...');
  browserSync.init({
    proxy: `localhost:${process.env.PORT}`,
    port: process.env.BROWSER_SYNC_PORT,
    open: false,
    files: [`${config.gulp.publicAssets}/**/*.{js,css,svg}`, './views/**/*.pug'],
  });

  gulp.watch(css, ['css']);
  gulp.watch(js, ['js']);
  gulp.watch(images, ['images']);
});
