var config = require('../config/config');
var mongoose = require('mongoose');
mongoose.connect('mongodb://' + config.mongo.host);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("Connection to DB established.");
});

module.exports = mongoose;