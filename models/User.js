var BaseModel = require("./Base");
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var config = require('../config/config');
var moment = require('moment');
var db = BaseModel.db;

function setPassword(password){
    console.log('setPassword() called');
    var pw = bcrypt.hashSync(password);
    return pw;
}
var userSchema = db.Schema({
    username: String,
    password: {type: String, set: setPassword},
    admin: Boolean
});
userSchema.methods.validatePassword = function(password){
    console.log('ValidatePW() called');
    return bcrypt.compareSync(password, this.password);
}
userSchema.methods.createToken = function(){
    console.log('CreateToken() called');
    var expires = moment().add('days', 1).valueOf();
    var token = jwt.encode({
        iss: this._id,
        exp: expires
    }, config().secret);
    return token;
}
userSchema.methods.isAdmin = function(){
    console.log('isAdmin() called');
    return this.admin;
}
var User = db.connection.model('User', userSchema);

module.exports = User;