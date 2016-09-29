var Clients = require('../models/clientModel');
var _bodyParser = require('body-parser');

module.exports = function(app) {

	app.use(_bodyParser.json());
	app.use(_bodyParser.urlencoded({
		extended: true
	}));

	app.get('/', function(req, res) {
		Clients.find({}, function(err, data) {
			if (err) console.log(err);
			res.render('index');
		});
	});

	app.get('/clients', function(req, res) {
		Clients.find({}, function(err, data) {
			if (err) console.log(err);
			res.json(data);
		});
	});

	app.get('/clients', function(req, res) {
		Clients.find({}, function(err, data) {
			if (err) console.log(err);
			//res.json(data);
			res.render('index');
		});
	});

	app.post('/clients', function(req, res) {
		Clients.create({
			firstname: req.body.firstname.text,
			lastname: req.body.lastname.text,
			gender: req.body.gender.text,
			birthday: req.body.birthday.text,
			description: req.body.description.text,
			done: false
		}, function(err, data) {
			if (err) console.log(err);

			Clients.find({}, function(err, data) {
				if (err) console.log(err);
				res.json(data);
			});
		});
	});

	app.delete('/clients/:client_id', function(req, res) {
		Clients.remove({
			_id: req.params.client_id
		}, function(err, data) {
			if (err) console.log(err);

			Clients.find({}, function(err, data) {
				if (err) console.log(err);
				res.json(data);
			});
		});
	});

	app.put('/clients', function(req, res) {
		Clients.update({
				_id: req.body._id
			}, {
				firstname: req.body.firstname.text,
				lastname: req.body.lastname.text,
				gender: req.body.gender.text,
				birthday: req.body.birthday.text,
				description: req.body.description.text,
				done: false
			},
			function(err, data) {
				if (err) console.log(err);
				Clients.find({}, function(err, data) {
					if (err) console.log(err);
					res.json(data);
				});
			});
	});
}