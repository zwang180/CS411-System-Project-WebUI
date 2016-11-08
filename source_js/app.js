var app = angular.module('mp4', ['ngRoute', 'mp4Controllers']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/query', {
    templateUrl: 'partials/query.html',
    controller: 'QueryController'
  }).
  when('/update', {
    templateUrl: 'partials/update.html',
    controller: 'UpdateController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);
