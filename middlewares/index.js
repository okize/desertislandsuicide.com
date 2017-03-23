let path = require('path');
let _ = require('lodash');
let express = require('express');
let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let lusca = require('lusca');
let passport = require('passport');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let cookieParser = require('cookie-parser');
let assets = require('express-asset-versions');
let compression = require('compression');
let flash = require('express-flash');
let sm = require('sitemap');
let favicon = require('serve-favicon');
let getIp = require('ipware')().get_ip;
let help = require('../lib/helpers');
let routes = require('../routes');
let logger = require('../lib/logger');
let log = logger.logger;

// public assets directory
let assetPath = path.join(__dirname, '..', 'public');

// if app is running in dev mode, pass through entire stack trace
// otherwise return an empty object
let getErrorStack = function(err, env) {
  if (env === 'development') {
    return err;
  } else {
    return {};
  }
};

module.exports = function(app) {

  // gzip assets
  app.use(compression({threshold: 1024}));

  // http logger
  app.use(logger.http);

  // robots.txt
  app.use(function(req, res, next) {
    if ('/robots.txt' === req.url) {
      res.type('text/plain');
      return res.send('User-agent: *\nSitemap: /sitemap.xml\nDisallow: /dash/');
    } else {
      return next();
    }
  });

  // sitemap.xml
  let sitemap = sm.createSitemap({
    hostname: process.env.APP_URL,
    cacheTime: 600000000,
    urls: [
      {url: '/', changefreq: 'daily'}
    ]
  });
  app.get('/sitemap.xml', function(req, res) {
    res.header('Content-Type', 'application/xml');
    return res.send(sitemap.toString());
  });

  // parsers
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(methodOverride());
  app.use(cookieParser());

  // session init
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: process.env.MONGODB_URI || process.env.MONGODB,
      auto_reconnect: true
    })
  })
  );

  // webapp security defaults
  app.use(lusca({
    csrf: true,
    csp: false,
    xframe: 'SAMEORIGIN',
    p3p: false,
    hsts: false,
    xssProtection: true
  })
  );

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
  app.use(function(req, res, next) {
    res.locals.user = req.user;
    return next();
  });

  // add user ip address to request session object
  app.use(function(req, res, next) {
    req.session.ipAddress = getIp(req);
    return next();
  });

  // static assets
  app.use(express.static(assetPath, {maxAge: 86400000}));
  app.use(favicon(path.join(assetPath, 'favicons', 'favicon.ico')));
  app.use(assets('', assetPath));

  // init routes
  app.use('/', routes.unprotected);
  app.use('/api', help.isAuthenticated, routes.protected);

  // catch 404s
  app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    return next(err);
  });

  // error handlers
  app.use(function(err, req, res, next) {
    if (err) { log.error(err); }
    res.status(err.status || 500);
    return res.render('error', {
      message: err.message,
      error: getErrorStack(err, app.get('env'))
    }
    );
  });

  // error logger
  return app.use(logger.error);
};
