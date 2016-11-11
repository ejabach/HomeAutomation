var BaseController 	= require("./Base");
var View 			= require("../views/Base");
var Sockets 		= require('../models/Socket');

module.exports = BaseController.extend({
	name: "Index",
	show: function(req, res, next){
		var v = new View(res, 'index');
		var params = {
			user: req.user
		};

		// Create several 'widgets' for each kind of item on dashboard
		// Then display one after the other (async?)!

		Sockets.find({}, function(err, sockets) {
			if(!err && sockets) {
				console.log(sockets);
				params.sockets = sockets;
				v.render({
					title: 'Dashboard',
					content: req.user,
					params: params
				});
			}
		});
	}
});