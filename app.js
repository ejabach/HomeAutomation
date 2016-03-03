var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var api = require('./controllers/api')
var sockets = require('./controllers/Socket');
var index = require('./controllers/Index');

var config = require('./config/config')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect('mongodb://127.0.0.1:27017/test', function(err, db) {
    if(err) {
        console.log('Sorry, there is no mongo db server running.');
    } else {
        console.log('Successfully connected to DB');
        
        var attachDB = function(req, res, next) {
            req.db = db;
            next();
        };
        
        //Set routes
        app.get('/', function(req, res, next){
          index.run(req, res, next);
        });
        app.get('/api/sockets', attachDB, function(req, res, next){
          api.sockets.get(req, res, next);
        });
        app.get('/api/sockets/:id(\\d+)', attachDB, function(req, res, next){
          api.sockets.show(req, res, next);
        });
        app.post('/api/sockets', attachDB, function(req, res, next){
          api.sockets.store(req, res, next);
        });
        app.put('/api/sockets/:id(\\d+)', attachDB, function(req, res, next){
          api.sockets.update(req, res, next);
        });
        // app.use('/sockets', sockets.run);
    }
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
