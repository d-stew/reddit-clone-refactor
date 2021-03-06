(function() {
  'use strict';

  angular.module('app.users')
    .factory('usersService', factory);
    // Factories return services

    factory.$inject = ['$http', '$window', '$location'];

    function factory($http, $window, $location) {
      var users = [];

      return {
        add: addUser,
        login: login
      }

      function addUser(newUser) {
        var factory = this;
        return $http.post('http://localhost:3000/api/v1/users', {
          email: newUser.email,
          username: newUser.username,
          password: newUser.password,
          confirmPassword: newUser.confirmPassword
        })
        .then(function (response) {
          $window.localStorage.setItem('token', response.data.token)
          $location.path('/')
          return response.data;
        })
        // .then(function(response) {
        //   // factory.users = response.data;
        //   // return factory.users;
        // })
      }

      function login(user) {
        return $http.post('http://localhost:3000/api/v1/users/login', user)
        .then(function (response) {
          $window.localStorage.setItem('token', response.data.token);
          $location.path('/');
          return response.data;
        })
      }

    }

}());
