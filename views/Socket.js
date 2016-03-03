var BaseView = require('./Base');

module.exports = BaseView.extend({
	name: "Sockets",
	run: function(req, res, next) {
		console.log('sockets run');
		var v = new View(res, 'sockets');
		v.render({
			title: 'Sockets',
			content: 'this will be a db object later'
		});
	}
});