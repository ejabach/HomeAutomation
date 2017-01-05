var BaseModel = require("./Base");
const exec = require('child_process').exec;
var db = BaseModel.db;

var socketSchema = db.Schema({
    name: String,
    status: Boolean,
    numbering: String
});

socketSchema.methods.toggle = function (callback) {
    if (this.status) {
        toggle(this, false, callback);
    } else {
        toggle(this, true, callback);
    }
};
socketSchema.methods.turnOn = function(callback){
    toggle(this, true, callback);
};
socketSchema.methods.turnOff = function(callback){
    toggle(this, false, callback);
};

function toggle(socket, status, callback) {
    var command = './send ' + socket.numbering + ' 1 ' + status;
    exec(command, function (error, stdout, stderr) {
        if (error) {
            console.error('exec error: ' + error);
            return;
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
    socket.status = status;
    callback();
}

var Socket = db.connection.model('Socket', socketSchema);

module.exports = Socket;
