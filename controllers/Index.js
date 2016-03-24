var BaseController = require("./Base");
var View = require("../views/Base");

module.exports = BaseController.extend({
	name: "Index",
	show: function(req, res, next){
		var v = new View(res, 'index');
		v.render({
			title: 'Welcome ',
			content: req.user
		});	
	}
});