(function() {
  'use strict';

  angular.module('app.posts')
    .factory('postsService', factory);
    // Factories return services

    factory.$inject = ['$http'];

    function factory($http) {
      var posts = [];

      return {
        add: addPost,
        list: listPosts
      }

    function listPosts() {
      var factory = this;
      return $http.get('http://localhost:3000/api/v1/posts')
      .then(function(response) {
        factory.posts = response.data;
        return factory.posts;
      })
    }

    function addPost() {
      console.log("Adding post!");
    }

    }

}());