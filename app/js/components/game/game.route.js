module.exports = function($stateProvider) {

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
        });

};
