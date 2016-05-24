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
            //element.css("left", scope.tile.xPos * 73);
            //element.css("top", scope.tile.yPos * 46);
            var tileDiv = $(element).find(".tile");
            tileDiv.css("left", scope.tile.xPos * 34 + (scope.tile.zPos * 4));
            tileDiv.css("top", scope.tile.yPos * 44 - (scope.tile.zPos * 4));
            tileDiv.css("z-index", scope.tile.zPos + (scope.tile.yPos));
        }
    };
}