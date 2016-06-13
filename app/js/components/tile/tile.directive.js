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
                scope.selectedTheme = newValue;
                switch(scope.selectedTheme.name){
                    case 'Light' :
                        scope.spacingX = 34;
                        scope.spacingY = 44;
                        scope.negativeSpacingY = 0;
                        break;
                    case 'Greenish' :
                        console.log("green");
                        scope.spacingX = 30;
                        scope.spacingY = 45;
                        scope.negativeSpacingY = 100;
                        break;
                }
                var tileDiv = $(element).find(".tile");
                tileDiv.css("left", scope.tile.xPos * scope.spacingX + (scope.tile.zPos * 4));
                tileDiv.css("top", scope.tile.yPos * scope.spacingY - (scope.tile.zPos * 4) - scope.negativeSpacingY);
            },true);

            var tileDiv = $(element).find(".tile");
            var zIndex = 100 + scope.tile.zPos *10 + (((scope.tile.yPos % 2 == 0)?scope.tile.yPos:scope.tile.yPos+1) + (scope.tile.zPos * scope.tile.yPos) - (scope.tile.xPos * 2));
            tileDiv.css("z-index", zIndex);
        }
    };
};