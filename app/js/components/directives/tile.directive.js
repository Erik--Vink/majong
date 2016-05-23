module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/tile.html',
        scope: {
            tile: '=tile'
        },
        controller: function($state, $scope, AuthFactory) {

            //$scope.tile = scope.tile;
            //$scope.isLoggedIn = AuthFactory.isLoggedIn;
            //$scope.currentUsername = AuthFactory.getUsername();
            //
            //$scope.logOut = function(){
            //    AuthFactory.logOut();
            //    $state.transitionTo('games'); // TODO: loginpage?
            //}
        },
        link : function(scope, element){
            console.log(scope.tile);
        }
    };
}