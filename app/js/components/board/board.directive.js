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
    };
};