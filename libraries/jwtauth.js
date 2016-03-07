var User = require('../models/User');
var jwt = require('jwt-simple');
var config = require('../config/config');

module.exports = function(req, res, next){
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    console.log('Token: ', token);
    if (token) {
      try {
        var decoded = jwt.decode(token, config().secret);
        if (decoded.exp <= Date.now()) {
          res.end('Access token has expired', 400);
        }
        User.findOne({ _id: decoded.iss }, function(err, user) {
            if (!err){
                req.user = user;
                next();
            } else {
                res.sendStatus(404);
            }
        });
      } catch (err) {
          console.error(err);
        res.sendStatus(403);
      }
    } else {
        console.log('token not set');
      res.sendStatus(403);
    }
};
