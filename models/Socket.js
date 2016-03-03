var BaseModel = require("./Base");
//var SocketsModel = require('/models/Sockets');

module.exports = BaseModel.extend({
    attributes: ['id', 'name', 'status'],
    findById: function(id) {
        
    }
});