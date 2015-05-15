(function() {
  'use strict';

  var dateApp = angular.module('application', [
    'ui.router',
    'ngAnimate',
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ]).config(config).run(run);

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

  function DateController($scope, $stateParams, $state, $controller) {
    angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));
    $scope.events = [
      {
        "occasion": "Birthday party",
        "invited_count": 120,
        "year": 2015,
        "month": 3,
        "day": 14
      },
      {
        "occasion": "Technical discussion",
        "invited_count": 23,
        "year": 2015,
        "month": 4,
        "day": 24
      },
      {
        "occasion": "Press release",
        "invited_count": 64,
        "year": 2015,
        "month": 6,
        "day": 7,
        "cancelled": true
      },
      {
        "occasion": "New year party",
        "invited_count": 55,
        "year": 2016,
        "month": 1,
        "day": 1
      }
    ];

    $scope.reverseSort = false;

    $scope.time = function (event) {
      var time = moment([event.year, event.month, event. day]);

      return time;
    };

    $scope.timeToNow = function (event) {
      return $scope.time(event).format('MMMM DD, YYYY');
    };

    $scope.unixTime = function (event) {
      return $scope.time(event).unix();
    };

    $scope.sort = function (dir) {
      if (dir === 'asc') {
        $scope.reverseSort = false;
      } else {
        $scope.reverseSort = true;
      }
    };
  }

  DateController.$inject = ['$scope', '$stateParams', '$state', '$controller'];

  dateApp.controller('DateController', DateController);

})();
