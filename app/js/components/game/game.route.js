module.exports = function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/games/:id', '/games/:id/players');

    $stateProvider
        .state('games', {
            url: '/games',
            templateUrl: 'partials/games.html',
            controller: 'GamelistController as glc'
        })
        .state('game', {
            url: "/games/:id",
            templateUrl: 'partials/game.html',
            controller: 'GameController as gc',
            params: {'id': '', 'game': null},
            resolve: {
                game: function($stateParams, GameService) {
                    if(!$stateParams.game){
                        return GameService.getGame($stateParams.id).then(function(game){
                            return game.data;
                        });
                    }
                    else{
                        return $stateParams.game;
                    }
                }
            }
        })
        .state('game.players', {
            url: '/players',
            templateUrl: 'partials/game-players.html'
        })
        .state('game.board', {
            url: '/board',
            templateUrl: 'partials/game-board.html'
        });

};
