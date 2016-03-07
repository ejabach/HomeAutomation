var BaseModel = require("./Base");
var db = BaseModel.db;

var socketSchema = db.Schema({
    name: String,
    status: Boolean
});
socketSchema.methods.turnOn = function(callback){
    console.log('Switch socket ' + this.name + ' from status ' + this.status);
    this. status = true;
    console.log('to status ' + this.status);
    callback();
};
socketSchema.methods.turnOff = function(callback){
    console.log('Switch socket ' + this.name + ' from status ' + this.status);
    this. status = false;
    console.log('to status ' + this.status);
    callback();
};

var Socket = db.connection.model('Socket', socketSchema);

module.exports = Socket;
