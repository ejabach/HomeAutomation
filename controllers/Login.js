var User = require('../models/User');
var BaseController = require("./Base");
var moment = require('moment');
var View = require("../views/Base");

module.exports = BaseController.extend({
	name: "Login",
	show: function(req, res, next){
            var v = new View(res, 'login');
            v.render({
                    title: 'Welcome ',
                    content: req.user
            });	
	},
        attempt: function(req, res, next){
            var username = req.body.username;
            var password = req.body.password;
            console.log('Received login attempt with username '+username+' and password '+password);
            User.findOne({ username: username }, function(err, usr){
                if (err) res.sendStatus(404);
                console.log('Found user!');
                var token = usr.createToken();
                if (token) {
                    console.log('Token successfully established.');
                    res.cookie('token', token, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 24*60*60*1000)
                    });
                    res.sendStatus(200);
                };
            });
        }
});