var BaseController = require("../Base");
var Socket = require('../../models/Socket');

/**
 * Handles all sockets requests 
 */
module.exports = BaseController.extend({
	get: function(req, res){
            console.log('GET request received: ', req.params);
            console.log('Return all Sockets');
            console.log('The Socket entity: ', Socket);
            Socket.find(function(err, sockets){
                if (!err) {
                    res.json(sockets);
                } else {
                    res.sendStatus(500);
                }
            });
	},
        show: function(req, res){
            console.log('GET request received: ', req.params);
            console.log('Show a specific Socket');
            var name = req.params.name;
            Socket.findOne({ name: name }, function(err, socket){
               if (!err) {
                   res.send(socket);
               } else {
                   console.error(err);
                   res.sendStatus(404);
               }
            });            
        },
        switch: function(req, res){
            console.log('GET request received: ', req.params);
            console.log('Switch status of socket ', req.params.name);
            var name = req.params.name;
            Socket.findOne({ name: name }, function(err, socket){
               if (!err) {
                   console.log('Socket found.');
                   socket.switch(function(err){
                       if (!err) {
                           console.log('Successfully switched socket.')
                           socket.save();
                           res.sendStatus(200);                           
                       } else {
                           console.error(err);
                           res.sendStatus(500);
                       }
                   });
               } else {
                   console.error(err);
                   res.sendStatus(404);
               }
            });
        },
        store: function(req, res){
            console.log('POST request received: ', req.body);
            console.log('Store socket with given data.');
            console.log('Socket model: ', Socket);
            var name = req.body.name;
            var status = false;
            var socket = new Socket({name: name, status: status});
            socket.save(function(err, socket){
                if (!err) {
                    console.log('Successfully created Socket!');
                    res.sendStatus(200);
                } else {
                    console.error(err);
                }
            })
            socket.turnOn();
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