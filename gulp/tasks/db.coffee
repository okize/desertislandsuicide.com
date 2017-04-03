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
    when 'reset'
      "mongo #{db.database} --eval 'db.dropDatabase()'"
    when 'import'
      "
        mongoimport --db #{db.database} --collection #{collectionName}
          --jsonArray --file #{filepath}
      "
    when 'export'
      "
        mongoexport --db #{db.database} --collection #{collectionName}
          --jsonArray --out #{filepath}
      "
    when 'restore'
      "mongorestore --drop --db #{db.database} #{filepath}/#{db.database}"
    when 'short'
      "
        mongodump --host #{db.hosts[0].host}
          --db #{db.database} --out #{filepath}
      "
    else
      "
        mongodump --host #{db.hosts[0].host} --port #{db.hosts[0].port}
          --db #{db.database} --username #{db.username}
          --password#{db.password} --out #{filepath}
      "

# seed database
gulp.task 'db:seed', ->
  dir = config.dbDirs.seeds
  seeds = fs.readdirSync dir
  envName = 'dev'
  db = mongodbUri.parse config.db[envName]
  filepath = ''
  collectionName = ''
  _.each seeds, (seed) ->
    filepath = "#{dir}/#{seed}"
    collectionName = seed.replace('.json', '')
    run(getMongoStr(db, filepath, 'import', collectionName))
    .exec( ->
      log.info "Seeded #{collectionName} model."
    )

# pass collection name as flag arg
gulp.task 'db:seed:create', ->
  # array of collection names based on model filenames
  collections = _.map fs.readdirSync('./models'), (f) -> f.replace('.js', 's')
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
    run(getMongoStr(db, filepath, 'export', collectionName)).exec()
  )

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

# import local db into production db (folder as argument flag)
# may have to delete collections manually on mongolab
gulp.task 'db:dump:import:prod', ->
  db = mongodbUri.parse config.db['prod']
  dumpFile = "./dumps/dev/#{getArgValue(argv)}/#{db.database}"
  mongoCommand = "mongorestore -h #{db.hosts[0].host}:#{db.hosts[0].port} -d #{db.database} -u #{db.username} -p #{db.password} #{dumpFile}"
  run(mongoCommand).exec( ->
    log.info 'Production database updated'
  )

# drops the local database
gulp.task 'db:reset', ->
  envName = 'dev'
  db = mongodbUri.parse config.db[envName]
  run(getMongoStr(db, null, 'reset'))
  .exec( ->
    log.info "Dropped database #{db.database}"
  )
