var _bodyParser = require('body-parser');

console.log("Error Controller");

module.exports = function(app) {
	app.use(_bodyParser.json());
	app.use(_bodyParser.urlencoded({
		extended: true
	}));

	app.get('/', function(req, res) {
		res.render('errorPage');
	});
}