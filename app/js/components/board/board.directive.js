module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/board.html',
        scope: {
            gameId: '=',
            tiles: '=',
            matches: '=',
            isMember: '=',
            type: '='
        },
        controller: "BoardController",
        controllerAs: 'vm',
        bindToController: true
    };
};