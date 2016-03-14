var BaseModel = require("./Base");
var bcrypt = require('bcrypt-nodejs');
var db = BaseModel.db;

function setPassword(password){
    console.log('setPassword() called');
    //wrong this object ???
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
var User = db.connection.model('User', userSchema);

module.exports = User;