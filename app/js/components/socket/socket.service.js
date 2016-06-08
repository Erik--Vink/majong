module.exports = function(){

    self.createConnection = function(gameId){
        return io.connect('http://mahjongmayhem.herokuapp.com?gameId='+gameId);
    };
};
