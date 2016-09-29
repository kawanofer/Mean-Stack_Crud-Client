var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientsSchema = new Schema({
	firstname: String,
	lastname: String,
	gender: String,
	birthday: String,
	description: String
});

var Clients = mongoose.model("Clients", clientsSchema);
module.exports = Clients;