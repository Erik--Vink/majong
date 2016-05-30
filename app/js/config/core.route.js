module.exports = function($locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true);
};
