var mongoose = require('mongoose');
var config = require('../config/config');

var mongo = config().mongo;
var uri = 'mongodb://' + mongo.host + ':' + mongo.port + '/' + mongo.db;
var options = {
  user: mongo.username,
  pass: mongo.password
};

mongoose.connect(uri , options);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('Connected to Database');
});

module.exports.db = mongoose;
