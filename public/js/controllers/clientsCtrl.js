angular.module("clientApp").controller("mainController", function($scope, $http) {
	$scope.app = "Clients Manager";
	$scope._id = {};
	$scope.firstname = {};
	$scope.lastname = {};
	$scope.gender = {};
	$scope.birthday = {};
	$scope.description = {};

	$http.get('/Clients').success(function(data) {
		$scope.cleanFields();
		$scope.clients = data;
	}).error(function(data, status) {
		$scope.errors = data;
	});

	$scope.selectId = function(client) {
		$scope._id.text = client._id;
		$scope.firstname.text = client.firstname;
		$scope.lastname.text = client.lastname;
		$scope.gender.text = client.gender;
		$scope.birthday.text = client.birthday;
		$scope.description.text = client.description;
		return $scope.selectedid = client._id;
	};

	$scope.saveClient = function() {
		if ($scope.selectedid == undefined) {
			$scope.insertClient();
		} else {
			$scope.updateClient();
		}
	};

	$scope.insertClient = function() {
		console.log($scope.birthday);

		$http.post('/Clients', {
			'firstname': $scope.firstname,
			'lastname': $scope.lastname,
			'gender': $scope.gender,
			'birthday': $scope.birthday,
			'description': $scope.description
		}).success(function(data) {
			$scope.cleanFields();
			$scope.clients = data;
		}).error(function(data) {
			console.log("Error: " + data);
		});
	};

	$scope.deleteClient = function(client) {
		$scope.selectedid = client._id;
		$http.delete('/Clients/' + $scope.selectedid).success(function(data) {
			$scope.clients = data;
		}).error(function(data) {
			console.log("Error: " + data);
		});
	};

	$scope.updateClient = function() {

		$http.put('/Clients', {
			'_id': $scope.selectedid,
			'firstname': $scope.firstname,
			'lastname': $scope.lastname,
			'birthday': $scope.birthday,
			'description': $scope.description,
			'gender': $scope.gender

		}).success(function(data) {
			$scope.cleanFields();

			$scope.clients = data;
		}).error(function(data) {
			console.log("Error: " + data);
			$scope.errors = data;
		});
	};

	$scope.cleanFields = function() {
		$scope._id = {};
		$scope.firstname = {};
		$scope.lastname = {};
		$scope.birthday = {};
		$scope.gender = {};
		$scope.description = {};
	};

	$scope.calculateAge = function(birthday) {
		// Formating data to (mm/dd/yyyy)
		var day = birthday.split("/");
		var newDay = new Date(day[2], day[1] - 1, day[0]);
		//
		var ageDifMs = Date.now() - new Date(newDay);
		var ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	};

	/*
	 * 
	 */
	$scope.orderBy = function(campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};
});