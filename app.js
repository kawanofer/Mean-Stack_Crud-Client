var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var clientsController = require('./controllers/clientController');
var errorController = require('./controllers/errorController');

// Build the connection string 
var dbURI = config.getDbConnectionString();

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
	'extended': 'true'
}));

app.use(bodyParser.json());
app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}));

/**
 * MONGO DB CONNECTION
 */
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function() {
	console.log('Mongoose default connection open to ' + dbURI);
	clientsController(app);
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
	console.log('Mongoose default connection error: ' + err);
	errorController(app);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
	console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		console.log('Mongoose default connection disconnected through app termination');
		process.exit(0);
	});
});

app.listen(port);
console.log("Server started at Port > " + port);