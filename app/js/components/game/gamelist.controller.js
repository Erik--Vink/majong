var _ = require('underscore');

module.exports = function(GameService, $uibModal, $state, AuthFactory){
    var self = this;

    //self.user = UserFactory.user;
    self.games = [];

    self.init = function(){
        GameService.getGames().then(function(response){
            self.games = response.data;
            console.log(response);
        });
    };

    self.createGame = function(){

        var modalInstance = $uibModal.open({
            templateUrl: 'partials/game-new-modal.html',
            controller: 'NewgameModalController',
            resolve: {
                gameTemplates: function () {
                    return GameService.getGameTemplates().then(function(response){
                        return response.data;
                    });
                }
            }
        });

        modalInstance.result.then(function (newGame) {
            GameService.createGame(newGame).then(function(response){
                self.successMessage = "Game successfully created.";
                self.games.unshift(response.data);
            }, function(error){
                self.errorMessage = error;
            });
        });
    };

    self.joinGame = function(game){
        GameService.joinGame(game).then(function(response){
            $state.transitionTo('game',{id:response.data.id, game:response.data});
        }, function(error){
            self.errorMessage = error.data.message;
        });
    };

    self.canJoinGame = function(game){
        if(game.state == 'finished' || game.state == 'playing'){
            return false;
        }
        if(game.players.length >= game.maxPlayers){
            return false;
        }

        if( _.some(game.players, function(player){ return player._id == AuthFactory.getUsername()})){
            return false;
        }

        return true;
    };

    //$http({
    //    method: "GET",
    //    url: "https://mahjongmayhem.herokuapp.com/Games"
    //}).then(function (response) {
    //    self.games = response.data;
    //}, function (err) {
    //    errors.push(err);
    //});
};

