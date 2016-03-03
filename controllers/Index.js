var BaseController = require("./Base");
var View = require("../views/Base");
//var SocketsModel = require('/models/Sockets');


module.exports = BaseController.extend({
	name: "Index",
	run: function(req, res, next){
		var v = new View(res, 'index');
		v.render({
			title: 'Welcome',
			content: 'user or something?'
		});	
	}
});