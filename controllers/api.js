var BaseController = require("./Base");
//var SocketsModel = require('/models/Sockets');

//for testing purposes
var sockets = [{
        id: 1,
        name: 'Socket 01',
        status: 0,
    },
    {
        id: 2,
        name: 'Socket 02',
        status: 1,
    }
];

/**
 * Handles all sockets requests 
 */
module.exports.sockets = BaseController.extend({
	get: function(req, res){
            console.log('GET request received: ', req.params);
            console.log('Return all Sockets');
            console.log('DB instance: ', req.db.collection);
            res.send(sockets);
	},
        show: function(req, res){
            console.log('GET request received: ', req.params);
            console.log('Show a specific Socket');
            var id = req.params.id;
            var socket = findSocket(id);
            if (!socket){
                res.sendStatus(404);
            } else {
                res.send(socket);
            }
        },        
        store: function(req, res){
            console.log('POST request received: ', req.body);
            console.log('Store socket with given data.');
            res.sendStatus(200);
        },
        update: function(req, res){
            console.log('PUT request received: ', req.body);
            console.log('For Socket ID: ', req.params.id);
            var id = req.params.id;
            var socket = findSocket(id);
            if (!socket){
                console.log('No socket found with given ID!');
                res.sendStatus(404);
            } else {
                console.log('Update Socket: ', socket)
                res.sendStatus(200);
            }
        }
});

function findSocket(id){
    try {
        id = parseInt(id);
    } catch (Exception) {
        console.log('caught exception');
    }
    for (var i=0; i < sockets.length; i++){
        if ( sockets[i].id === id){
            var ret = sockets[i];
            break;
        }
    }
    return ret;
}