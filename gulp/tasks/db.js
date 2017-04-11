// db tasks

let path = require('path');
let fs = require('fs');
let gulp = require('gulp');
let run = require('gulp-run');
let _ = require('lodash');
let { argv } = require('yargs');
let moment = require('moment');
let mkdirp = require('mkdirp');
let mongodbUri = require('mongodb-uri');

let config = require('../config');
let log = require('../helpers/log');

let getDateStamp = () => moment().format('YYYYMMDD-hhmmss');

let getArgValue = argv => _.findKey(argv, (v, k) => v === true);

let getMongoStr = function(db, filepath, type, collectionName) {
  switch (type) {
    case 'reset':
      return `mongo ${db.database} --eval 'db.dropDatabase()'`;
    case 'import':
      return `\
mongoimport --db ${db.database} --collection ${collectionName} \
--jsonArray --file ${filepath}\
`;
    case 'export':
      return `\
mongoexport --db ${db.database} --collection ${collectionName} \
--jsonArray --out ${filepath}\
`;
    case 'restore':
      return `mongorestore --drop --db ${db.database} ${filepath}/${db.database}`;
    case 'short':
      return `\
mongodump --host ${db.hosts[0].host} \
--db ${db.database} --out ${filepath}\
`;
    default:
      return `\
mongodump --host ${db.hosts[0].host} --port ${db.hosts[0].port} \
--db ${db.database} --username ${db.username} \
--password${db.password} --out ${filepath}\
`;
  }
};

// seed database
gulp.task('db:seed', function() {
  let dir = config.dbDirs.seeds;
  let seeds = fs.readdirSync(dir);
  let envName = 'dev';
  let db = mongodbUri.parse(config.db[envName]);
  let filepath = '';
  let collectionName = '';
  return _.each(seeds, function(seed) {
    filepath = `${dir}/${seed}`;
    collectionName = seed.replace('.json', '');
    return run(getMongoStr(db, filepath, 'import', collectionName))
    .exec( () => log.info(`Seeded ${collectionName} model.`));
  });
});

// pass collection name as flag arg
gulp.task('db:seed:create', function() {
  // array of collection names based on model filenames
  let collections = _.map(fs.readdirSync('./models'), f => f.replace('.js', 's'));
  if (_.size(argv) !== 3) {
    return log.error('Pass name of collection to export as a flag.');
  }
  let collectionName = getArgValue(argv);
  if (!_.include(collections, collectionName)) {
    return log.error(`Not a valid collection name; must be one of: ${collections.join(', ')}`);
  }
  let dir = config.dbDirs.seeds;
  let filepath = `${dir}/${collectionName}.json`;
  let envName = 'dev';
  let db = mongodbUri.parse(config.db[envName]);
  return mkdirp(dir, function(err) {
    if (err) { throw err; }
    return run(getMongoStr(db, filepath, 'export', collectionName)).exec();
  });
});

// pass db env as flag arg
gulp.task('db:dump', function() {
  // array of environment names from config
  let envs = _.keys(config.db);
  if (_.size(argv) !== 3) {
    return log.error('Pass name of database environment to dump.');
  }
  let envName = getArgValue(argv);
  if (!_.include(envs, envName)) {
    return log.error(`Not a valid environment name; must be one of: ${envs.join(', ')}`);
  }
  let dir = path.join(config.dbDirs.dumps, envName);
  let filepath = `${dir}/${getDateStamp()}`;
  let db = mongodbUri.parse(config.db[envName]);
  return mkdirp(dir, function(err) {
    if (err) { throw err; }
    if (db.username != null) {
      return run(getMongoStr(db, filepath)).exec();
    } else {
      return run(getMongoStr(db, filepath, 'short')).exec();
    }
  });
});

// import production db into local db
gulp.task('db:dump:import', function() {
  let envName = 'prod';
  let dir = path.join(config.dbDirs.dumps, envName);
  let filepath = `${dir}/${getDateStamp()}`;
  let db = mongodbUri.parse(config.db[envName]);
  return mkdirp(dir, function(err) {
    if (err) { throw err; }
    return run(getMongoStr(db, filepath))
    .exec( () =>
      run(getMongoStr(db, filepath, 'restore'))
      .exec( () => log.info('Database downloaded from production and imported to dev'))
    );
  });
});

// import local db into production db (folder as argument flag)
// may have to delete collections manually on mongolab
gulp.task('db:dump:import:prod', function() {
  let db = mongodbUri.parse(config.db['prod']);
  let dumpFile = `./dumps/dev/${getArgValue(argv)}/${db.database}`;
  let mongoCommand = `mongorestore -h ${db.hosts[0].host}:${db.hosts[0].port} -d ${db.database} -u ${db.username} -p ${db.password} ${dumpFile}`;
  return run(mongoCommand).exec( () => log.info('Production database updated'));
});

// drops the local database
gulp.task('db:reset', function() {
  let envName = 'dev';
  let db = mongodbUri.parse(config.db[envName]);
  return run(getMongoStr(db, null, 'reset'))
  .exec( () => log.info(`Dropped database ${db.database}`));
});
