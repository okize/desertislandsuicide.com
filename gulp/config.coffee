# configuration file for Gulp tasks

path = require 'path'
root = path.resolve(__dirname, '..')
assets = path.resolve(root, 'public')

module.exports =
  root: root
  taskDir: "#{root}/gulp/tasks/"
  main: "#{root}/app.coffee"
  publicAssetsDir: assets

  # DO NOT restart node app when files change in these directories
  appIgnoreDirs: [
    'node_modules/',
    'gulp/',
    'assets/',
    'public/'
  ]

  # asset sources
  src:
    favicons: "#{root}/assets/favicons/"
    images: "#{root}/assets/images/"
    sassEntry: 'main.sass'
    sassDir: "#{root}/assets/sass/"

  # asset compilation targets
  dist:
    faviconsDir: "#{assets}/favicons/"
    imagesDir: "#{assets}/images/"
    cssName: 'styles.css'
    cssDir: "#{assets}/stylesheets/"
