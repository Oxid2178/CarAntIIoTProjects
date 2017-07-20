var app = angular.module('myApp', []);
app.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
		console.log("Hello World from controller");

	var refresh = function() {
		$scope.contact = {
		 	name: '',
		 	email: '',
		 	number:''
		};
		// Object.keys($scope.contact).forEach(function(key, index) {
  		// 		$scope.contact[key] = '';
		// });
		$http({
	     	method: 'GET',
	      	url: '/contactlist'
	   	}).then(function (response){
	   		console.log("I got the data I requested");
	   		$scope.contactlist = response.data;
	   	},function (error) {
	   		console.log("Error in GET contactlist...");
	   	});
	};

	refresh();

   	$scope.addContact = function() {
   		console.log($scope.contact);
   		$http({
     		method: 'POST',
      		url: '/contactlist',
      		data: $scope.contact
   		}).then(function (response) {
   			console.log("Post data to server");
   			console.log(response.data);
   			refresh();
   		},function (error) {
   			console.log("Error in addContact (POST) contactlist...");
   		});
   	};

   	$scope.remove = function(id) {
   		console.log(id);
   		$http({
     		method: 'DELETE',
      		url: '/contactlist/' +id,
      		data: id
   		}).then(function (response) {
   			console.log("Delete data to server");
   			refresh();
   		},function (error) {
   			console.log("Error in remove (DELETE) contactlist...");
   		});
   	};

   	$scope.edit = function(id) {
   		console.log(id);
   		$http({
     		method: 'GET',
      		url: '/contactlist/' +id
   		}).then(function (response) {
   			console.log("Edit data to server");
   			$scope.contact = response.data;
   		},function (error) {
   			console.log("Error in EDIT (GET) contactlist...");
   		});
   	};

   	$scope.update = function() {
   		console.log($scope.contact._id);
   		$http({
     		method: 'PUT',
      		url: '/contactlist/' +$scope.contact._id,
      		data: $scope.contact
   		}).then(function (response) {
   			console.log("Put data to server");
   			console.log(response.data);
   			refresh();
   		},function (error) {
   			console.log("Error in UPDATE (PUT) contactlist...");
   		});
   	};

   	$scope.deselect = function() {
   		$scope.contact = {
		 	name: '',
		 	email: '',
		 	number:''
		};
   	};

}]);