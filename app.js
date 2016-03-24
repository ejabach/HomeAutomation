var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var assert = require('assert');

var authentication = require('./libraries/jwtauth');
var authorization = require('./libraries/authorization');
var api = require('./controllers/api/API');
var config = require('./config/config');
var index = require('./controllers/Index');
var sockets = require('./controllers/Socket');
var web = require('./controllers/Web');

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


//Require authentication if not running in development mode
if (app.get('env') !== 'development') {
    console.log('Not running in development environment.');
    app.all('/api/*', authentication);
} else {
    console.log('Running in development environment.');
    app.use(function(req, res, next){
        console.log('Setting user');
        req.user = {username: "testuser",
            password:"",
            admin: true,
            isAdmin: function(){
                return this.admin;
            }
        }
        next();
    });
}

/********************
 *       API        *
 ********************
 * /api/
 *  /user/
 *      /auth
 *          POST - Handout JSON Web Token if given user data is correct
 *      /create
 *          POST - Create a new user
 *  
*/
app.post('/api/user/auth', function(req, res, next){
  api.users.auth(req, res, next);
});
app.post('/api/user/create', 
//function(req, res, next){
//    req.user={
//        admin:true,
//        isAdmin: function(){return true}
//    };
//    next();
//},
authorization('create-user'), function(req, res, next){
  api.users.create(req, res, next);
});
/*
 *  /sockets/
 *      GET - Returns list of all known sockets
 *      POST - Saves a new socket
 *            
 *     /:name
 *          GET - Returns specific socket given by :name
 *     /:name/switch
 *          GET - Switches the socket given by :name
 */
app.get('/api/sockets' , function(req, res, next){
  api.sockets.get(req, res, next);
});
app.get('/api/sockets/:name', function(req, res, next){
  api.sockets.show(req, res, next);
});
app.get('/api/sockets/:name/switch', function(req, res, next){
  api.sockets.switch(req, res, next);
});
app.post('/api/sockets' , function(req, res, next){
  api.sockets.store(req, res, next);
});
app.put('/api/sockets/:id(\\d+)', function(req, res, next){
  api.sockets.update(req, res, next);
});
/********************
 *       WEB        *
 ********************/
app.get('/', function(req, res, next){
    web.index.show(req, res, next);
});
app.get('/login', function(req, res, next){
    web.login.show(req, res, next);
})
app.post('/login', function(req, res, next){
    web.login.attempt(req, res, next);
})


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
