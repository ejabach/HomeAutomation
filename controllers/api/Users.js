var BaseController = require("../Base");
var User = require('../../models/User');
var jwt = require('jwt-simple');
var moment = require('moment');

/**
 * Handles all sockets requests
 */
module.exports = BaseController.extend({
    auth: function(req, res) {
        User.findOne({username: req.body.username}, function(err, user){
            if (err || !user || !user.validatePassword(req.body.password)) {
                console.error('Error during auth: ', err);
                console.log('User:', user);
                res.sendStatus(401);
            } else {
              if (!user.validatePassword(req.body.password))
              {
                console.log('Wrong PW!');
                res.sendStatus(401);
              } else {
                var token = user.createToken();
                res.json({username: user.username, token: token, isAdmin: user.admin});
              }
            }
        });
    },
    create: function(req, res) {
        console.log('Create request received!');
        var username = req.body.username;
        var password = req.body.password;
        console.log('Username: ', username);
        console.log('PW: ', password);
        var user = new User({username: username,
            password: password,
            admin: false});
        console.log('User after PW: ', user);
        user.save(function(err, user){
            if (!err) {
                console.log('User saved.');
                res.json({
                    _id: user._id,
                    username: user.username
                });
            } else {
                console.error(err);
                res.sendStatus(500);
            }
        });
    },
    show: function(req, res) {
        console.log('Show all users request.');
        User.find(function(err, users){
            if (err) res.sendStatus(400);
            var arr = [];
            for (var i = 0; i < users.length; i++){
                var user = users[i];
                arr.push({
                    _id: user._id,
                    username: user.username
                });
            }
            res.json(arr);
        });
    }
});
