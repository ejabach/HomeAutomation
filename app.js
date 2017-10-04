var path            = require('path');
var assert          = require('assert');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var express         = require('express');
var mongoose        = require('mongoose');

var api             = require('./controllers/api/API');
var authentication  = require('./libraries/jwtauth');
var authorization   = require('./libraries/authorization');
var config          = require('./config/config');
var mqttController  = require('./controllers/api/MQTTController');


var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/api', mqttController);

// Initialize all API modules
api.init();

//Require authentication if not running in development mode
if (app.get('env') !== 'development') {
    console.log('Not running in development environment.');
} else {
    console.log('Running in development environment.');
    // app.use(function(req, res, next){
    //     console.log('Setting user');
    //     req.user = {username: "testuser",
    //         password:"",
    //         admin: true,
    //         isAdmin: function(){
    //             return this.admin;
    //         }
    //     };
    //     next();
    // });
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
app.get('/api/user', authentication, function(req, res, next){
    api.users.show(req, res, next);
});
app.post('/api/user/auth', function(req, res, next){
    api.users.auth(req, res, next);
});
app.post('/api/user/create', authentication, function(req, res, next){
    api.users.create(req, res, next);
});
/*
 *  /sockets/
 *      GET - Returns list of all known sockets
 *      POST - Saves a new socket
 *
 *     /:name
 *          GET - Returns specific socket given by :name
 *     /:name/toggle
 *          GET - Switches the socket given by :name
 */
app.get('/api/sockets', authentication, function(req, res, next){
    api.sockets.get(req, res, next);
});
app.get('/api/sockets/:name', authentication, function(req, res, next){
    api.sockets.show(req, res, next);
});
app.put('/api/sockets/:name/toggle', authentication, function (req, res, next) {
    if (app.get('env') != 'development') {
        api.sockets.toggle(req, res, next);
    } else {
        console.log('Can\'t access sockets in development environment');
    }
});
app.post('/api/sockets', authentication , function(req, res, next){
    api.sockets.store(req, res, next);
});
app.put('/api/sockets/:id(\\d+)', authentication, function(req, res, next){
    api.sockets.update(req, res, next);
});

/*
Task List
 */
app.get('/api/tasks', authentication, function(req, res, next) {
    api.tasks.get(req, res, next);
});
app.post('/api/tasks', authentication, function (req, res, next) {
    api.tasks.store(req, res, next);
});
app.get('/api/tasks/:id/toggle', authentication, function (req, res, next) {
    api.tasks.toggle(req, res, next);
});
app.delete('/api/tasks/:id', authentication, function (req, res, next) {
    api.tasks.delete(req, res, next);
});

/*
Angular handles the frontend
 */
app.get('*', function (req, res) {
    console.log('Received other request than /api/\nRedirect to /');
    res.redirect('/');
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
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
