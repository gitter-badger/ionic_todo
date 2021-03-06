angular.module('todoApp.controllers', [])
  .controller('TodoListController', ['$scope', 'Todo', function ($scope, Todo) {

    Todo.getAll().success(function (data) {
      $scope.items = data.results;

    });

    $scope.onItemDelete = function (item) {

      Todo.delete(item.objectId);

      $scope.items.splice($scope.items.indexOf(item), 1);
    }

  }])
  .controller('TodoCreationController', ['$scope', 'Todo', '$state', function ($scope, Todo, $state) {

    $scope.todo = {};

    $scope.create = function () {
      Todo.create({content: $scope.todo.content}).success(function (data) {
        $state.go('todos');
      });
    }
  }])
  .controller('TodoEditController', ['$scope', 'Todo', '$state', '$stateParams', function ($scope, Todo, $state, $stateParams) {

    Todo.get($stateParams.id).success(function (data) {
      $scope.todo = data;
    });

    $scope.edit = function () {
      Todo.edit($scope.todo.objectId, {content: $scope.todo.content}).success(function (data) {
        $state.go('todos');
      });
    }
  }]);
