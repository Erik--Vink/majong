module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/board.html',
        scope: {
            gameId: '=',
            tiles: '=',
            matches: '=',
            isMember: '='
        },
        controller: "BoardController",
        controllerAs: 'vm',
        bindToController: true
    };
};