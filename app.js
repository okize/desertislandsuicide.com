var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var routes = require('./routes');
var app = express();

app.set('port', process.env.PORT || 4444);

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// logger
app.use(logger('dev'));

// static assets
app.use(favicon(__dirname + '/public/favicons/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routes);
app.use('/subscribed', routes);

// catch 404s
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
