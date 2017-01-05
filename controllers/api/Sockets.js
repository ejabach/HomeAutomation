var BaseController = require("../Base");
var Socket = require('../../models/Socket');

/**
 * Handles all sockets requests
 */
module.exports = BaseController.extend({
    get: function(req, res) {
        console.log('GET request received: ', req.params);
        if (!(req.params.id || req.params.name)) {
            console.log('Return all Sockets');
            console.log('The Socket entity: ', Socket);
            Socket.find(function (err, sockets) {
                if (!err) {
                    res.json(sockets);
                } else {
                    res.sendStatus(500);
                }
            });
        } else {
            if (req.params.id) {
                console.log('Show a specific Socket by id');
                var id = req.params.id;
                Socket.findOne({id: id}, function (err, socket) {
                    if (!err) {
                        res.send(socket);
                    } else {
                        console.error(err);
                        res.sendStatus(404);
                    }
                });
            } else {
                console.log('Show a specific Socket by name');
                var name = req.params.name;
                Socket.findOne({name: name}, function (err, socket) {
                    if (!err) {
                        res.send(socket);
                    } else {
                        console.error(err);
                        res.sendStatus(404);
                    }
                });
            }
        }
    },
    toggle: function(req, res){
        console.log('GET request received: ', req.params);
        console.log('Switch status of socket ', req.params.name);
        var name = req.params.name;
        Socket.findOne({ name: name }, function(err, socket){
            if (!err && socket) {
                console.log('Socket found.');
                socket.toggle(function(err){
                    if (!err) {
                        console.log('Successfully switched socket.');
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
        var name = req.body.name;
        var numbering = req.body.numbering;
        var status = false;

        if(name && numbering) {
            var socket = new Socket({name: name, numbering: numbering, status: status});

            socket.save(function (err, socket) {
                if (!err) {
                    console.log('Successfully created Socket!');
                    res.json(socket);
                } else {
                    console.error(err);
                    res.sendStatus(500);
                }
            })
        } else {
            console.log('name or numbering not set correctly:\n\tname: %s,\n\tnumbering: %s', name, numbering);
            res.sendStatus(500);
        }
    },
    update: function(req, res){
        console.log('PUT request received: ', req.body);
        console.log('For Socket ID: ', req.params.id);
        var socket = new Socket({name: req.params.name,
            status: false,
            numbering: req.params.numbering});
        Socket.findOneAndUpdate({id: req.params.id}, socket, {upsert: true}, function (err, doc) {
            if (!err) {
                console.log('Socket update successfully!');
                res.json(socket);
            } else {
                console.log('Error occurred: %s', doc);
                res.json({error: true, hint: doc});
            }
        });
    }
});