module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/nav.html',
        controller: ['$state', '$scope', 'AuthFactory', function($state, $scope, AuthFactory) {
            $scope.isLoggedIn = AuthFactory.isLoggedIn;
            $scope.currentUsername = AuthFactory.getUsername();

            $scope.logOut = function(){
                AuthFactory.logOut();
                $state.transitionTo('games'); // TODO: loginpage?
            }
        }]
    };
};