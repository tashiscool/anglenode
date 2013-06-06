'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngCookies'])
    .config(['$locationProvider', function($location) {
        $location.html5Mode(true).hashPrefix('!'); //now there won't be a hashbang within URLs for browers that support HTML5 history
    }]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/findBook', {templateUrl: 'partials/findBook.html', controller: HomeController});
    $routeProvider.when('/Samples', {templateUrl:'partials/samples.html', controller: InstagramAuthController})
    $routeProvider.otherwise({redirectTo: 'https://sso.rumba.int.pearsoncmg.com/sso/login?service=http://floating-peak-4593.herokuapp.com/'});
  }])
  ;