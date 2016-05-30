module.exports = function($stateProvider) {

    $stateProvider
        .state('authcallback', {
            url: '/authcallback?username&token',
            resolve: {
                auth: function($stateParams, $location, AuthFactory) {
                    AuthFactory.logIn($stateParams);
                    $location.url("/games");
                }
            }
        })
        .state('login', {
            url: "/login",
            templateUrl: 'partials/login.html'
        });
};
