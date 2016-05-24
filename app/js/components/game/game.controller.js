
module.exports = function(GameService, $stateParams, game){
    var self = this;

    self.init = function(){
        self.game = game;
        GameService.getGameTiles($stateParams.id).then(function(data){
            self.gameTiles = data.data;
            console.log(data);
        });
    };
};

