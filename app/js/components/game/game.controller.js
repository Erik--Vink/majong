
module.exports = function(GameService, $stateParams, game, AuthFactory, MatchFactory){
    var self = this;

    self.init = function(){
        self.game = game;

        GameService.getGameTilesMatched($stateParams.id, false).then(function(data){
            self.gameTiles = data.data;
        });

        GameService.getGameMatches($stateParams.id).then(function(data){
            self.gameMatches = data.data;
        });

        self.isOwner = self.game.createdBy._id == AuthFactory.getUsername();
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

    self.canStartGame = function(game){
        if(game.state != 'open'){
            return false;
        }
        if(game.players.length < game.minPlayers){
            return false;
        }

        return true;
    };

    self.joinGame = function(game){
        GameService.joinGame(game).then(function(response){
            self.game = response.data;
        }, function(error){
            self.errorMessage = error.data.message;
        });
    };

    self.startGame = function(game){
        GameService.startGame(game).then(function(response){
            self.game = response.data;
        }, function(error){
            self.errorMessage = error.data.message;
        });
    };

    self.postMatch = function(tile1Id, tile2Id){
        MatchFactory.postMatch(self.game._id, tile1Id, tile2Id);
    };

    self.initSocket = function(){
        //stub todo

        //var gameSocket = io.connect('http://mahjongmayhem.herokuapp.com?gameId='+game.id);
        //
        //gameSocket.on('connect', function () {
        //    gameSocket.emit('start');
        //});
        //
        //gameSocket.on('start', function () {
        //    console.log("started");
        //});
        //
        //gameSocket.emit('match')
        //
        //gameSocket.on('match', function () {
        //    console.log("started");
        //});
    }
};

