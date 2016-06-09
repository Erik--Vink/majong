module.exports = function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/games', '/games/all');
    $urlRouterProvider.when('/game/:id', '/game/:id/details');

    $stateProvider
        .state('games', {
            url: '/games',
            templateUrl: 'partials/games-master.html'
        })
        .state('games.all', {
            url: '/all',
            templateUrl: 'partials/games.html',
            controller: 'GamelistController as glc',
            resolve: {
                showFilter: function(){
                    return true;
                },
                params: function(){
                    return {
                        createdBy : null,
                        player: null,
                        gameTemplate: null,
                        state: null
                    };
                }
            }
        })
        .state('games.mygames', {
            url: '/mygames',
            templateUrl: 'partials/games.html',
            controller: 'GamelistController as glc',
            resolve: {
                showFilter: function(){
                    return false;
                },
                params: function(AuthFactory){
                    return {
                        createdBy : null,
                        player: AuthFactory.getUsername(),
                        gameTemplate: null,
                        state: null
                    };
                }
            }
        })
        .state('games.history', {
            url: '/history',
            templateUrl: 'partials/games.html',
            controller: 'GamelistController as glc',
            resolve: {
                showFilter: function(){
                    return false;
                },
                params: function(){
                    return {
                        createdBy : null,
                        player: null,
                        gameTemplate: null,
                        state: 'finished'
                    };
                }
            }
        })
        .state('games.open', {
            url: '/open',
            templateUrl: 'partials/games.html',
            controller: 'GamelistController as glc',
            resolve: {
                showFilter: function(){
                    return false;
                },
                params: function(){
                    return {
                        createdBy : null,
                        player: null,
                        gameTemplate: null,
                        state: 'open'
                    };
                }
            }
        })
        .state('games.spectate', {
            url: '/spectate',
            templateUrl: 'partials/games.html',
            controller: 'GamelistController as glc',
            resolve: {
                showFilter: function(){
                    return false;
                },
                params: function(){
                    return {
                        createdBy : null,
                        player: null,
                        gameTemplate: null,
                        state: 'playing'
                    };
                }
            }
        })
        .state('game', {
            url: "/game/:id",
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
        })
        .state('game.details', {
            url: '/details',
            templateUrl: 'partials/game-details.html'
        });

};
