module.exports = function(){
    var self = this;

    self.createConnection = function(gameId){
        return io.connect('http://mahjongmayhem.herokuapp.com?gameId='+gameId);
    };
};
