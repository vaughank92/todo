var myTodo = angular.module('myTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};

	//whne hitting the page, display all of the todos
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	//when add form is submitted, add text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; //clear form
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	//delete todo
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
		.success(function(data) {
		 	$scope.todos = data;
		 	console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

}