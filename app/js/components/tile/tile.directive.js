module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/tile.html',
        scope: {
            tile: '=tile'
        },
        controller: function($scope, $rootScope) {
            $scope.$on('tileToggled', function (event, data) {
                if(data.target == $scope.tile) {
                    $scope.selected = data.state;
                }
            });

            $rootScope.$watch('selectedTheme', function(newValue){
                $scope.selectedTheme = newValue;
            },true);

            $scope.toggleSelected = function(){
                $scope.$emit('tileSelected', $scope.tile);
            };
        },
        link : function(scope, element){
            scope.$watch('selectedTheme', function(newValue){
                if(newValue){
                    scope.selectedTheme = newValue;
                    var tileDiv = $(element).find(".tile");
                    tileDiv.css("left", scope.tile.xPos * scope.selectedTheme.tileSet.spacingX + (scope.tile.zPos * scope.selectedTheme.tileSet.sideSpacingX));
                    tileDiv.css("top", scope.tile.yPos * scope.selectedTheme.tileSet.spacingY - (scope.tile.zPos * scope.selectedTheme.tileSet.sideSpacingY) - scope.selectedTheme.tileSet.negativeSpacingY);
                }
            },true);
            var tileDiv = $(element).find(".tile");
            var zIndex = 100 + scope.tile.zPos *10 + (((scope.tile.yPos % 2 == 0)?scope.tile.yPos:scope.tile.yPos+1) + (scope.tile.zPos * scope.tile.yPos) - (scope.tile.xPos * 2));
            tileDiv.css("z-index", zIndex);
        }
    };
};