angular.module('todoController', [])

  .controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};

    console.log('hit!');

    //get all the todos when you land on the page
    Todos.get()
      .success(function(data) {
        console.log('success');
        $scope.todos = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

      //submit the add form, send the text to the nodeAPI
      $scope.createTodo = function() {
        if(!$.isEmptyObject($scope.formData)) {
          Todos.create($scope.formData)
          .success(function(data) {
            $scope.formData = {};
            $scope.todos = data;
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
        };
      };

      $scope.deleteTodo = function(id) {
        $http.delete(id)
          .success(function(data) {
            $scope.todos = data;
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      };
})();
