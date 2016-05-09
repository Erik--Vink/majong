module.exports = function($stateProvider) {

    $stateProvider
        .state('games', {
            url: '/games',
            templateUrl: 'partials/games.html',
            controller: 'GamelistController as glc'
        })
        .state('games.detail', {
            url: "/games/:gameId",
            templateUrl: 'partials/games.detail.html',
            controller: 'GameController as gc'
        });

};
