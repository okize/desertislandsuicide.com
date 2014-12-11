# configuration file for Gulp tasks

path = require 'path'
rootPath = path.resolve(__dirname, '..')
assetsPath = path.resolve(rootPath, 'public')

module.exports =

  app:
    root: root: rootPath
    main: "#{rootPath}/app.coffee"
    publicAssets: assetsPath

  js:
    entry: 'app.coffee'
    src: "#{rootPath}/assets/coffee/"
    dist: "#{assetsPath}/javascripts/"
    name: 'scripts.js'

  css:
    entry: 'main.sass'
    src: "#{rootPath}/assets/sass/"
    dist: "#{assetsPath}/stylesheets/"
    name: 'styles.css'

  images:
    src: "#{rootPath}/assets/images/"
    dist: "#{assetsPath}/images/"

  favicons:
    src: "#{rootPath}/assets/favicons/"
    dist: "#{assetsPath}/favicons/"

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
