module.exports = function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $locationProvider.html5Mode(true);
};
