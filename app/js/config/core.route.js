module.exports = function($locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $locationProvider.html5Mode(true);
};
