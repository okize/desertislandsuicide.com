# db tasks

path = require 'path'
fs = require 'fs'
gulp = require 'gulp'
run = require 'gulp-run'
_ = require 'lodash'
argv = require('yargs').argv
moment = require 'moment'
mkdirp = require 'mkdirp'
mongodbUri = require 'mongodb-uri'

config = require '../config'
log = require '../helpers/log'

getDateStamp = ->
  moment().format('YYYYMMDD-hhmmss')

getArgValue = (argv) ->
  _.findKey argv, (v, k) -> v == true

getMongoStr = (db, filepath, type, collectionName) ->
  switch type
    when 'export'
      "
        mongoexport -d desertislandsuicide
          -c #{collectionName} > #{filepath}
      "
    when 'restore'
      "mongorestore --drop -d #{db.database} #{filepath}/#{db.database}"
    when 'short'
      "
        mongodump --host #{db.hosts[0].host}
          --db #{db.database} -o #{filepath}
      "
    else
      "
        mongodump --host #{db.hosts[0].host}:#{db.hosts[0].port}
          --db #{db.database} -u #{db.username}
          -p#{db.password} -o #{filepath}
      "

# pass db env as flag arg
gulp.task 'db:dump', ->
  # array of environment names from config
  envs = _.keys(config.db)
  unless _.size(argv) == 3
    return log.error 'Pass name of database environment to dump.'
  envName = getArgValue argv
  unless _.include(envs, envName)
    return log.error "Not a valid environment name; must be one of: #{envs.join(', ')}"
  dir = path.join(config.dbDirs.dumps, envName)
  filepath = "#{dir}/#{getDateStamp()}"
  db = mongodbUri.parse config.db[envName]
  mkdirp(dir, (err) ->
    throw err if err
    if db.username?
      run(getMongoStr(db, filepath)).exec()
    else
      run(getMongoStr(db, filepath, 'short')).exec()
      .exec()
  )

# import production db into local db
gulp.task 'db:dump:import', ->
  envName = 'prod'
  dir = path.join(config.dbDirs.dumps, envName)
  filepath = "#{dir}/#{getDateStamp()}"
  db = mongodbUri.parse config.db[envName]
  mkdirp(dir, (err) ->
    throw err if err
    run(getMongoStr(db, filepath))
    .exec( ->
      run(getMongoStr(db, filepath, 'restore'))
      .exec( ->
        log.info 'Database downloaded from production and imported to dev'
      )
    )
  )

# pass collection name as flag arg
gulp.task 'db:create:seed', ->
  # array of collection names based on model filenames
  collections = _.map fs.readdirSync('./models'), (f) -> f.replace('.coffee', 's')
  unless _.size(argv) == 3
    return log.error 'Pass name of collection to export as a flag.'
  collectionName = getArgValue argv
  unless _.include(collections, collectionName)
    return log.error "Not a valid collection name; must be one of: #{collections.join(', ')}"
  dir = config.dbDirs.seeds
  filepath = "#{dir}/#{collectionName}.json"
  envName = 'dev'
  db = mongodbUri.parse config.db[envName]
  mkdirp(dir, (err) ->
    throw err if err
    run(getMongoStr(db, filepath, 'export', collectionName))
    .exec()
  )
