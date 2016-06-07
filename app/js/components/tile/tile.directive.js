module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/tile.html',
        scope: {
            tile: '=tile'
        },
        controller: function($scope, MatchFactory, $rootScope) {

            $scope.toggleSelected = function(){
                $scope.tile.selected = !$scope.tile.selected;
                //$rootScope.$emit('rootScope:emit', $scope.tile);
                $scope.$emit('tileSelected', $scope.tile); // going up!
                $scope.selected ? MatchFactory.addTile($scope.tile) : MatchFactory.removeTile($scope.tile);
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