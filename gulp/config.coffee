# configuration file for Gulp tasks

path = require 'path'
rootPath = path.resolve(__dirname, '..')
assetsPath = path.resolve(rootPath, 'public')

module.exports =

  app:
    root: root: rootPath
    main: "#{rootPath}/app.coffee"

  js:
    entry: 'app.coffee'
    src: "#{rootPath}/assets/coffee/"
    dest: "#{assetsPath}/javascripts/"
    maps: './'
    name: 'scripts.js'

  css:
    entry: 'main.sass'
    src: "#{rootPath}/assets/sass/"
    dest: "#{assetsPath}/stylesheets/"
    maps: './'
    name: 'styles.css'

  images:
    src: "#{rootPath}/assets/images/"
    dest: "#{assetsPath}/images/"

  favicons:
    src: "#{rootPath}/assets/favicons/"
    dest: "#{assetsPath}/favicons/"

  # DO NOT restart node app when files change in these directories
  nodemon:
    ignore: [
      'node_modules/',
      'gulp/',
      'assets/',
      'public/'
    ]

  gulp:
    src: "#{rootPath}/gulp/tasks/"
    publicAssets: assetsPath
