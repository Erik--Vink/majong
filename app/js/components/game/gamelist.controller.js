var _ = require('underscore');

module.exports = function($scope, GameService, $uibModal, $state, AuthFactory, params, showFilter, $timeout){
    var self = this;

    self.init = function(){
        self.games = [];
        self.states = [];
        self.templates = [];
        self.params = params;
        self.showFilter = showFilter;

        self.getGames(self.params);

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

    self.switchTab = function(state){

        switch(state){
            case 'all':
                $state.go('games.'+state, {showFilter:true}, { reload: true});
                return;
            case 'history':
                $state.go('games.'+state, {showFilter:false}, { reload: true});
                return;
        }

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
            if(self.params.player){
                response.data.forEach(function(game){
                    game.foundPlayers = _.filter(game.players, function(player){return player._id.toLowerCase().indexOf(self.params.player.toLowerCase()) > -1 && player.name != game.createdBy.name; });
                });
                self.games = response.data;
            }
            else{
                self.games = response.data;
            }
        });
    };

    var timeout;
    self.getGamesDelayed = function(){
        if (timeout != null) {
            $timeout.cancel(timeout);
        }
        timeout = $timeout(function() {
            self.getGames();
        }, 500);
    };
};

