if (process.env.NODE_ENV === 'production') { require('newrelic'); } // eslint-disable-line global-require
// ^-- this needs to be first line of app

const path = require('path');
const express = require('express');
const middlewares = require('./middlewares');
const log = require('./lib/logger').logger;

const app = express(); // init app
require('./lib/mongodb'); // connect to db

// config
app.set('app name', process.env.APP_NAME || 'DesertIslandSuicide');
app.set('port', process.env.PORT || 4444);
app.set('env', process.env.NODE_ENV || 'development');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// init middlewares & routes
middlewares(app);

// await connections
app.listen(app.get('port'), () => {
  log.info(`${app.get('app name')} started on http://localhost:${app.get('port')} in [${app.get('env')}]`);
});

module.exports = app;
