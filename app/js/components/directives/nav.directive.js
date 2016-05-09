module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/nav.html',
        controller: ['$scope', function($scope) {
            //$scope.isLoggedIn = Auth.isLoggedIn;
            //$scope.currentUser = Auth.currentUser;

            $scope.logOut = function(){
                //Auth.logOut();
                //$location.path('login');
            }
        }]
    };
};