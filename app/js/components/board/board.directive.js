/**
 * Created by Nevernown on 6-6-2016.
 */
module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/board.html',
        scope: {
            gameId: '=',
            tiles: '=',
            matches: '='
        },
        controller: "BoardController",
        controllerAs: 'vm',
        bindToController: true
    };
};