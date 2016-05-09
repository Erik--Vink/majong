var _ = require('underscore');

module.exports = function(GameService){
    var self = this;

    //self.user = UserFactory.user;
    self.games = [];

    self.init = function(){
        GameService.getGames().then(function(response){
            self.games = response.data;
        });
    };

    self.newGame = function(){
        self.game = {};
    };

    self.joinGame = function(game){
        if(self.canJoinGame(game)){
            game.players.push(self.user);
        }
    };

    self.canJoinGame = function(game){
        if(game.state == 'finished'){
            return false;
        }
        if(game.maxPlayers >= game.players.length){
            return false;
        }

        if( _.some(game.players, function(player){ return player.name == self.user.name})){
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

