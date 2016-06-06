/**
 * Created by Nevernown on 6-6-2016.
 */
module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/board.html',
        scope: {
            tiles: '=tiles'
        },
        controller: "BoardController"
        // link : function(scope, element){
        //     var tileDiv = $(element).find(".tile");
        //     tileDiv.css("left", scope.tile.xPos * 34 + (scope.tile.zPos * 4));
        //     tileDiv.css("top", scope.tile.yPos * 44 - (scope.tile.zPos * 4));
        //     tileDiv.css("z-index", scope.tile.zPos + scope.tile.yPos + (scope.tile.zPos * scope.tile.yPos));
        // }
    };
};