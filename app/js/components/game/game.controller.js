
module.exports = function(GameService, $stateParams, game){
    var self = this;

    self.init = function(){
        self.game = game;
        GameService.getGameTiles($stateParams.id).then(function(data){
            self.gameTiles = data.data;
            console.log(data);
        });

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
    };
};

