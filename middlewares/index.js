const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const lusca = require('lusca');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const assets = require('express-asset-versions');
const compression = require('compression');
const flash = require('express-flash');
const sm = require('sitemap');
const favicon = require('serve-favicon');
const getIp = require('ipware')().get_ip;
const help = require('../lib/helpers');
const routes = require('../routes');
const logger = require('../lib/logger');

const log = logger.logger;

// public assets directory
const assetPath = path.join(__dirname, '..', 'public');

// if app is running in dev mode, pass through entire stack trace
// otherwise return an empty object
const getErrorStack = (err, env) => {
  if (env === 'development') {
    return err;
  }
  return {};
};

module.exports = (app) => {
  // gzip assets
  app.use(compression({ threshold: 1024 }));

  // http logger
  app.use(logger.http);

  // robots.txt
  app.use((req, res, next) => {
    if (req.url === '/robots.txt') {
      res.type('text/plain');
      return res.send('User-agent: *\nSitemap: /sitemap.xml\nDisallow: /dash/');
    }
    return next();
  });

  // sitemap.xml
  const sitemap = sm.createSitemap({
    hostname: process.env.APP_URL,
    cacheTime: 600000000,
    urls: [
      { url: '/', changefreq: 'daily' },
    ],
  });

  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    return res.send(sitemap.toString());
  });

  // parsers
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(cookieParser());

  // session init
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: process.env.MONGODB_URI || process.env.MONGODB,
      auto_reconnect: true,
    }),
  }));

  // webapp security defaults
  app.use(lusca({
    csrf: true,
    csp: false,
    xframe: 'SAMEORIGIN',
    p3p: false,
    hsts: false,
    xssProtection: true,
  }));

  // init passport authentication
  app.use(passport.initialize());
  app.use(passport.session());

  // flash messages
  app.use(flash());

  // # save original destination before login
  // app.use (req, res, next) ->
  //   path = req.path.split("/")[1]
  //   if /auth|login|logout|signup|fonts|favicon/i.test(path)
  //     return next()
  //   req.session.returnTo = req.path
  //   next()

  // make user object available in templates
  app.use((req, res, next) => {
    res.locals.user = req.user;
    return next();
  });

  // add user ip address to request session object
  app.use((req, res, next) => {
    req.session.ipAddress = getIp(req);
    return next();
  });

  // static assets
  app.use(express.static(assetPath, { maxAge: 86400000 }));
  app.use(favicon(path.join(assetPath, 'favicons', 'favicon.ico')));
  app.use(assets('', assetPath));

  // init routes
  app.use('/', routes.unprotected);
  app.use('/api', help.isAuthenticated, routes.protected);

  // catch 404s
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  });

  // error handlers
  app.use((err, req, res, next) => {
    if (err) { log.error(err); }
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: getErrorStack(err, app.get('env')),
    });
    return next(err);
  });

  // error logger
  return app.use(logger.error);
};
