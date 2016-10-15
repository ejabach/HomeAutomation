var BaseController 	= require("./Base");
var View 			= require("../views/Base");
var Sockets 		= require('/models/Socket');
//var SocketsModel = require('/models/Sockets');


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
		console.log('save socket');		
	}
});