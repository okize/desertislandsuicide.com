// db tasks

const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const run = require('gulp-run');
const _ = require('lodash');
const { argv } = require('yargs');
const moment = require('moment');
const mkdirp = require('mkdirp');
const mongodbUri = require('mongodb-uri');

const config = require('../gulpconfig');
const log = require('./helpers/log');

const getDateStamp = () => moment().format('YYYYMMDD-hhmmss');

const getArgValue = argv => _.findKey(argv, val => val === true);

const getMongoStr = function (db, filepath, type, collectionName) {
  const { database, username, password } = db;
  const { host, port } = db.hosts[0];
  switch (type) {
    case 'reset':
      return `mongo ${database} --eval 'db.dropDatabase()'`;
    case 'import':
      return `mongoimport --db ${database} --collection ${collectionName} --jsonArray --file ${filepath}`;
    case 'export':
      return `mongoexport --db ${database} --collection ${collectionName} --jsonArray --out ${filepath}`;
    case 'restore':
      return `mongorestore --drop --db ${database} ${filepath}/${database}`;
    case 'short':
      return `mongodump --host ${host} --db ${database} --out ${filepath}`;
    default:
      return `mongodump --host ${host} --port ${port} --db ${database} --username ${username} --password${password} --out ${filepath}`;
  }
};

// seed database
gulp.task('db:seed', () => {
  const dir = config.dbDirs.seeds;
  const seeds = fs.readdirSync(dir);
  const envName = 'dev';
  const db = mongodbUri.parse(config.db[envName]);
  let filepath = '';
  let collectionName = '';
  return _.each(seeds, (seed) => {
    filepath = `${dir}/${seed}`;
    collectionName = seed.replace('.json', '');
    return run(getMongoStr(db, filepath, 'import', collectionName))
    .exec(() => log.info(`Seeded ${collectionName} model.`));
  });
});

// pass collection name as flag arg
gulp.task('db:seed:create', () => {
  // array of collection names based on model filenames
  const collections = _.map(fs.readdirSync('./models'), f => f.replace('.js', 's'));
  if (_.size(argv) !== 3) {
    return log.error('Pass name of collection to export as a flag.');
  }
  const collectionName = getArgValue(argv);
  if (!_.include(collections, collectionName)) {
    return log.error(`Not a valid collection name; must be one of: ${collections.join(', ')}`);
  }
  const dir = config.dbDirs.seeds;
  const filepath = `${dir}/${collectionName}.json`;
  const envName = 'dev';
  const db = mongodbUri.parse(config.db[envName]);
  return mkdirp(dir, (err) => {
    if (err) { throw err; }
    return run(getMongoStr(db, filepath, 'export', collectionName)).exec();
  });
});

// pass db env as flag arg
gulp.task('db:dump', () => {
  // array of environment names from config
  const envs = _.keys(config.db);
  if (_.size(argv) !== 3) {
    return log.error('Pass name of database environment to dump.');
  }
  const envName = getArgValue(argv);
  if (!_.include(envs, envName)) {
    return log.error(`Not a valid environment name; must be one of: ${envs.join(', ')}`);
  }
  const dir = path.join(config.dbDirs.dumps, envName);
  const filepath = `${dir}/${getDateStamp()}`;
  const db = mongodbUri.parse(config.db[envName]);
  return mkdirp(dir, (err) => {
    if (err) { throw err; }
    if (db.username != null) {
      return run(getMongoStr(db, filepath)).exec();
    }
    return run(getMongoStr(db, filepath, 'short')).exec();
  });
});

// import production db into local db
gulp.task('db:dump:import', () => {
  const envName = 'prod';
  const dir = path.join(config.dbDirs.dumps, envName);
  const filepath = `${dir}/${getDateStamp()}`;
  const db = mongodbUri.parse(config.db[envName]);
  return mkdirp(dir, (err) => {
    if (err) { throw err; }
    return run(getMongoStr(db, filepath)).exec(() => {
      run(getMongoStr(db, filepath, 'restore')).exec(() => {
        log.info('Database downloaded from production and imported to dev');
      });
    });
  });
});

// import local db into production db (folder as argument flag)
// may have to delete collections manually on mongolab
gulp.task('db:dump:import:prod', () => {
  const db = mongodbUri.parse(config.db.prod);
  const { host, port } = db.hosts[0];
  const dumpFile = `./dumps/dev/${getArgValue(argv)}/${db.database}`;
  const mongoCommand = `mongorestore -h ${host}:${port} -d ${db.database} -u ${db.username} -p ${db.password} ${dumpFile}`;
  return run(mongoCommand).exec(() => log.info('Production database updated'));
});

// drops the local database
gulp.task('db:reset', () => {
  const envName = 'dev';
  const db = mongodbUri.parse(config.db[envName]);
  return run(getMongoStr(db, null, 'reset'))
  .exec(() => log.info(`Dropped database ${db.database}`));
});
