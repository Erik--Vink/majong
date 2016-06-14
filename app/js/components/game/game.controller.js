var _ = require("underscore");

module.exports = function(GameService, $stateParams, game, AuthFactory, MatchFactory, SocketService, $uibModal, $state){
    var self = this;

    self.init = function(){
        self.game = game;
        self.isOwner = self.game.createdBy._id == AuthFactory.getUsername();

        GameService.getGameTiles(game.id).then(function(data){
            self.gameTiles = data.data;
        });
        getMatches();

        self.initSocket();
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

    self.isMemberOfGame = function(){
        var game = self.game;
        if( _.some(game.players, function(player){ return player._id == AuthFactory.getUsername()})){
            return true;
        }
        return false;
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
            $state.reload();
        }, function(error){
            self.errorMessage = error.data.message;
        });
    };

    self.postMatch = function(tile1Id, tile2Id){
        MatchFactory.postMatch(self.game._id, tile1Id, tile2Id);
    };

    self.initSocket = function(){

        gameSocket = SocketService.createConnection(self.game._id);

        gameSocket.on('end', function () {
            $uibModal.open({
                templateUrl: 'partials/alert-modal.html',
                controller: function($scope, $uibModalInstance, modalVars){
                    $scope.modalVars = modalVars;
                    $scope.ok = function() {
                        $uibModalInstance.dismiss();
                    };
                },
                resolve: {
                    modalVars: function(){
                        return {
                            title:"This game has ended",
                            description: "You can still watch the current gameboard or you can play another game."
                        }
                    }
                }
            });
        });
    };

    var getMatches = function(){
        var matches = [];
        var matchedTileIds = [];

        GameService.getGameMatches(game.id).then(function(data){

            data.data.forEach(function(match){
                if(_.contains(matchedTileIds, match.match.otherTileId)){

                    var existingMatchPosition;
                    var existingMatch = _.find(matches, function(item, itemIndex){
                        if(item.tile1Id == match.match.otherTileId){ existingMatchPosition = itemIndex; return item;}
                    });
                    existingMatch.tile2Id = match._id;
                    existingMatch.tile2 = match.tile;
                    if(existingMatchPosition){
                        matches[existingMatchPosition] = existingMatch;
                        matchedTileIds.push(match._id);
                    }
                }
                else if(!_.contains(matchedTileIds, match._id)){
                   matches.push({
                       "foundBy" : match.match.foundBy,
                       "foundOn": match.match.foundOn,
                       "tile1Id": match._id,
                       "tile1": match.tile
                   });
                   matchedTileIds.push(match._id);
                }
            });
            self.gameMatches = matches;
        });
    };
};

