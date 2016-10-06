var BaseView = require('./Base');

module.exports = BaseView.extend({
	name: "Settings",
	run: function(req, res, next) {
		console.log('test');
		var v = new View(res, 'sockets');
		v.render({
			title: 'Sockets',
			content: 'this will be a db object later'
		});
	}
});