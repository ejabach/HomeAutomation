var BaseController = require("./Base");
var View = require("../views/Base");

module.exports = BaseController.extend({
	name: "Login",
	show: function(req, res, next){
            var v = new View(res, 'login');
            v.render({
                    title: 'Welcome ',
                    content: req.user
            });	
	},
        attempt: function(req, res, next){
            var username = req.body.username;
            var password = req.body.password;
        }
});