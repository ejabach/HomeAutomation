var BaseController 	= require("./Base");
var View 			= require("../views/Base");
var Sockets 		= require('../models/Socket');

module.exports = BaseController.extend({
	name: "Sockets",
	run: function(req, res, next){
		console.log('sockets run');
		var v = new View(res, 'sockets');
                console.log(v);
		v.render({
			title: 'Sockets',
			content: 'this will be a db object later'
		});	
	},
	show: function(req, res){
		console.log('Show sockets called');
		var v = new View(res, 'sockets');
		Sockets.find({}, function(err, sockets){
			if (!err) {
				v.render(sockets);
			}
		});
		res.sendStatus(200);
	},
	add: function(req, res, next){
		console.log('new socket should be added');
		var v = new View(res, 'AddSocket');
		v.render();
	},
	store: function(req, res, next){
		console.log('Save socket');
		if (req.name && req.numbering) {
			console.log('\tname: %s\n\tnumbering: %s', req.name, req.numbering);
			var socket = new Sockets({
				name: req.name,
				status: false,
				numbering: req.numbering
			});
			socket.save();
			res.json(socket);
		}
		console.log('Missing params');
		res.sendStatus(500);
	}
});