var BaseController = require("./Base");
//var SocketsModel = require('/models/Sockets');

module.exports = BaseController.extend({
	name: "Sockets",
	run: function(req, res, next){
		console.log('sockets list');
		var v = new View(res, 'Socket');		
		v.render({
			title: 'Sockets',
			content: 'this will be a db object later'
		});	
	},
	add: function(req, res, next){
		console.log('new socket should be added');
		var v = new View(res, 'AddSocket');
		v.render();
	},
	store: function(req, res, next){
		console.log('save socket');		
	},
	delete: function(req, res, next){
		console.log('new socket should be deleted');
		//remove from db
	}

});