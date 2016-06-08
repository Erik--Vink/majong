var _ = require('underscore');

module.exports = function(GameService, $uibModal, $state, AuthFactory){
    var self = this;

    //self.user = UserFactory.user;
    self.games = [];

    self.states = [];

    self.templates = [];

    self.params = {
        createdBy : null,
        player: null,
        gameTemplate: null,
        state: null
    };

    self.init = function(){
        GameService.getGames().then(function(response){
            self.games = response.data;
        });
        GameService.getGameStates().then(function(response){
            self.states = _.map(response.data, function (state) {
                return state.state
            });
            self.states.push(null);
        });
        GameService.getGameTemplates().then(function(response){
            self.templates = _.map(response.data, function (template) {
                return template.id;
            });
            self.templates.push(null);
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
        if(game.state != 'open'){
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

    self.getGames = function () {
        GameService.getGames(self.params).then(function (response) {
            //if(self.params.player){
            //    response.data.forEach(function(game){
            //        _.find(game.players, function(player){ return player.name % 2 == 0; });
            //    });
            //}
            //else{
                self.games = response.data;
            //}
        });
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

