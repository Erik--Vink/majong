module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/tile.html',
        scope: {
            tile: '=tile'
        },
        controller: function($state, $scope, AuthFactory) {

            $scope.toggleSelected = function(){
              $scope.selected = !$scope.selected;
                console.log($scope.tile)
            };
        },
        link : function(scope, element){
            var tileDiv = $(element).find(".tile");
            tileDiv.css("left", scope.tile.xPos * 34 + (scope.tile.zPos * 4));
            tileDiv.css("top", scope.tile.yPos * 44 - (scope.tile.zPos * 4));
            tileDiv.css("z-index", scope.tile.zPos + scope.tile.yPos + (scope.tile.zPos * scope.tile.yPos));
        }
    };
}