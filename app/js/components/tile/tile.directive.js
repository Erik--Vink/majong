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
            var zIndex = 100 + scope.tile.zPos *10 + (((scope.tile.yPos % 2 == 0)?scope.tile.yPos:scope.tile.yPos+1) + (scope.tile.zPos * scope.tile.yPos) - (scope.tile.xPos * 2));
            tileDiv.css("z-index", zIndex);
        }
    };
};