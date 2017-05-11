const path = require('path');

const rootPath = path.resolve(__dirname);
const assetsPath = path.resolve(rootPath, 'public');

module.exports = {
  app: {
    root: rootPath,
    main: `${rootPath}/app.js`,
  },

  js: {
    entry: 'app.jsx',
    src: `${rootPath}/assets/src/`,
    dest: `${assetsPath}/javascripts/`,
    maps: './',
    name: 'scripts.js',
  },

  css: {
    entry: 'main.sass',
    src: `${rootPath}/assets/sass/`,
    dest: `${assetsPath}/stylesheets/`,
    maps: './',
    name: 'styles.css',
  },

  images: {
    src: `${rootPath}/assets/images/`,
    dest: `${assetsPath}/images/`,
  },

  favicons: {
    src: `${rootPath}/assets/favicons/`,
    dest: `${assetsPath}/favicons/`,
  },

  db: {
    dev: process.env.MONGODB_DEV,
    test: process.env.MONGODB_TEST,
    prod: process.env.MONGODB_URI,
  },

  dbDirs: {
    dumps: path.resolve(rootPath, 'dumps'),
    seeds: path.resolve(rootPath, 'seeds'),
  },

  gulp: {
    src: `${rootPath}/tasks/`,
    publicAssets: assetsPath,
  },

  // DO NOT restart node app when files change in these directories
  nodemon: {
    ignore: [
      'node_modules/',
      'tasks/',
      'assets/',
      'public/',
    ],
  },
};
