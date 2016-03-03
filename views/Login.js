var BaseView = require('./Base');

module.exports = BaseView.extend({
	name: "Login",
	run: function(req, res, next) {
		console.log('login page');
		var v = new View(res, 'Login');
		v.render({
			title: 'Login',
			content: 'this will be a db object later'
		});
	};
});