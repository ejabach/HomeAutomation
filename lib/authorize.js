var session = require('express-session');

function isAuthorized(req){
	// return (
	// 		req.session && 
	// 		req.session.fastdelivery && 
	// 		req.session.fastdelivery === true
	// 	) || (
	// 		req.body && 
	// 		req.body.username === this.username && 
	// 		req.body.password === this.password
	// );
	return true;
}

var authorize = function(req, res, next){
	if (isAuthorized(req)) {
		next();
	}
	else {
		var v = new View(res, 'Login');
		v.render({
			title: 'Please login'
		});
	}
}


module.exports = authorize;