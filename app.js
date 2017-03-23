if (process.env.NODE_ENV === 'production') { require('newrelic'); } // this needs to be first line of app

let path = require('path');
let express = require('express');
let middlewares = require('./middlewares');
let log = require('./lib/logger').logger;

// init app
let app = express();

// connect to db
let db = require('./lib/mongodb');

// config
app.set('app name', process.env.APP_NAME || 'DesertIslandSuicide');
app.set('port', process.env.PORT || 4444);
app.set('env', process.env.NODE_ENV || 'development');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// init middlewares & routes
middlewares(app);

// await connections
app.listen(app.get('port'), () => log.info(`${app.get('app name')} started on port ${app.get('port')} in [${app.get('env')}]`));

module.exports = app;
