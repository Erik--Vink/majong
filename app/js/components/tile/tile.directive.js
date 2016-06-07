module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/tile.html',
        scope: {
            tile: '=tile'
        },
        controller: function($scope) {
            $scope.$on('tileToggled', function (event, data) {
                if(data.target == $scope.tile) {
                    $scope.selected = data.state;
                }
            });

            $scope.toggleSelected = function(){
                $scope.$emit('tileSelected', $scope.tile);
            };
        },
        link : function(scope, element){
            var tileDiv = $(element).find(".tile");
            tileDiv.css("left", scope.tile.xPos * 34 + (scope.tile.zPos * 4));
            tileDiv.css("top", scope.tile.yPos * 44 - (scope.tile.zPos * 4));
            tileDiv.css("z-index", scope.tile.zPos + scope.tile.yPos + (scope.tile.zPos * scope.tile.yPos));
        }
    };
};