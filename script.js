var app = angular.module('musicApp', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider.when("/Items", {
      templateUrl: "view-list.html",
      controller: "listController"
    })
    .when("/Items/Add", {
      templateUrl: "view-detail.html",
      controller: "addController"
    })
    .when("/Items/:index", {
      templateUrl: "view-detail.html",
      controller: "editController"
    })
    .otherwise({
      redirectTo: "/Items"
    })
});


app.factory("musicService", ["$rootScope", function($rootScope) {

  var svc = {};

  var data = [{
    name: 'FFTL',
    genre: 'Screamo',
    rating: 6
  }, {
    name: 'Brand New',
    genre: 'Indie',
    rating: 7
  }, {
    name: 'American Football',
    genre: 'Garage Rock',
    rating: 9
  }];


  svc.getArtists = function() {
    return data;
  };
  
  svc.addArtist = function(artist) {
    data.push(artist);
  };

  svc.editArtist = function(artist,index) {
    data[index] = artist;
  };

  return svc;

}]);

app.controller('listController', ['$scope', '$location', '$routeParams', 'musicService',
  function($scope, $location, $routeParams, musicService) {


    $scope.data = musicService.getArtists();


    $scope.addArtist = function() {
      $location.path("/Items/Add");
    };


    $scope.editItem = function(index) {
      $location.path("/Items/" + index);
    };

  }
]);



app.controller('editController', ['$scope', '$location', '$routeParams', 'musicService',
  function($scope, $location, $routeParams, musicService) {

    $scope.Item = musicService.getArtists()[parseInt($routeParams.index)];

    $scope.save = function() {
      musicService.editArtist($scope.Item,parseInt($routeParams.index));
      $location.path("/Items");
    };

    $scope.cancel = function() {
      $location.path("/Items");
    };

  }
]);

app.controller('addController', ['$scope', '$location', '$routeParams', 'musicService',
  function($scope, $location, $routeParams, musicService) {

    $scope.save = function() {
      musicService.addArtist({name:$scope.Item.name, genre:$scope.Item.genre, rating:$scope.Item.rating});
      $location.path("/Items");
    };

    $scope.cancel = function() {
      $location.path("/Items");
    };

  }
]);