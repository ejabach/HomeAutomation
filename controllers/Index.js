var BaseController 	= require("./Base");
var View 			= require("../views/Base");
var Sockets 		= require('/models/Socket');

module.exports = BaseController.extend({
	name: "Index",
	show: function(req, res, next){
		var v = new View(res, 'index');
		var params;

		Sockets.find({}, function(err, sockets) {
			if(!err) {
				params.sockets = sockets;
			}
		});

		v.render({
			title: 'Welcome ',
			content: req.user,
			params: params
		});
	}
});