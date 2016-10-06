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
            if (authorize(user, action)) {
                console.log('user is authorized');
                next();
            } else {
                console.log('user is not authorized');
                res.sendStatus(401);
            }
        } else {
            console.log('user or action not set');
            res.sendStatus(401);
        }
    }
};

/**
 * Helper function
 */
function authorize(user, action) {
    console.log('User \'' + user.name + '\' asks for permission to \'' + action + '\'');
    switch(action) {
        /*
         * Add authorization logic here!
         */
        case 'create-user':
            return user.isAdmin();
            break;
        default:
            return false;
    }
}
