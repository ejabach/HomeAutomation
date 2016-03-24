var User = require('../models/User');
var config = require('../config/config');

module.exports = function(action){
    console.log('auth function set with action', action);
    return function(req, res, next){
        console.log('author called');
        var user = req.user;
        console.log('auth request with user '+user+' and action '+action);
        if (action && user){
            console.log('action and user set');
            switch(action){
                case 'create-user':
                    console.log('action is create-user');
                    if (user.isAdmin()){
                        console.log('user is admin');
                        next();
                    } else {
                        console.log('user is not admin');
                        res.sendStatus(401);
                    };
                    break;
                default:
                    console.log('default case reached');
                    res.sendStatus(401);
            }
        } else {
            console.log('user or action not set');
            res.sendStatus(401);
        }
    }
};
