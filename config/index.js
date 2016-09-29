var configValues = require('./config');

module.exports = {
	getDbConnectionString: function() {
		return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds051655.mlab.com:51655/db_node_kawano'
	}
}