/**
 * Created by ejabach on 11/26/2016.
 */
var BaseController  = require("../../Base");
var Socket          = require('../../../models/Socket');
var User            = require('../../../models/User');

module.exports = BaseController.extend({
    /*
    Fills the DB with a predefined list of sockets
     */
    sockets: function() {
        var socketlist = [
            new Socket({
                name: 'TestSocket 1',
                numbering: '1000',
                status: true
            }),
            new Socket({
                name: 'TestSocket 2',
                numbering: '1001',
                status: false
            })
        ];
        socketlist.forEach(function(socket) {
           socket.save(function(err, socket){
               if (!err) {
                   console.log('Created socket %s\n', socket.name);
               } else {
                   console.log('Error seeding socket DB');
               }
           });
        });
    }
    }
);