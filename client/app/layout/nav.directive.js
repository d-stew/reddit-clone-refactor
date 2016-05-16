(function() {
  'use strict';

  angular.module('app')
    .directive('nav', navDirective);

  function navDirective () {
    return {
      templateUrl: '/app/layout/nav.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', '$scope', 'postsService', 'usersService'];

  function controller($http, $scope, postsService, usersService) {
      var vm = this;
      
      $scope.addPost = addPost;
      $scope.signUp = signUp;
      $scope.sortBy = sortBy;

      $scope.nav = {};
      $scope.nav.sorter = "score";
      $scope.nav.reverse = true;

      $scope.newPost = {};
      $scope.newUser = {};

      function addPost(newPost) {
        postsService.add(newPost);
        $scope.newPost = {};
      }

      function signUp(newUser) {
        usersService.add(newUser);
      }

      function sortBy(sorter) {
        if (sorter == "title") {
          $scope.nav.reverse = false;
        }
        if (sorter == "score") {
          $scope.nav.reverse = true;
        }
        return $scope.nav.sorter = sorter;
      };

    }

}());
