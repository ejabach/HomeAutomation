var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var socketSchema = mongoose.Schema({
        name: String,
        status: boolean,
        turnOn: function(){
            console.log(this.name + ' turned on!');
        }
    });
    var socket = mongoose.model('Socket', socketSchema);
});