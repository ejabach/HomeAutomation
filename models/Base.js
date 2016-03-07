var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log('Connected to Database');
})

module.exports.db = mongoose;
//module.exports.prototype = {
//    extend: function(properties) {
//        var Child = module.exports;
//        Child.prototype = module.exports.prototype;
//        for(var key in properties) {
//            Child.prototype[key] = properties[key];
//        }
//        return Child;
//    },
//    db: mongoose,
//    attributes: []
//}