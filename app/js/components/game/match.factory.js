var _ = require('underscore');

module.exports = function($http, apiUrl){
    var self = this;
    var urlBase = apiUrl+'games';

    var maxSelectedTiles = 2;
    var selectedTiles = [];

    self.addTile = function(tile){
      if(selectedTiles.length < maxSelectedTiles){
          selectedTiles.push(tile);
      }

    };

    self.removeTile = function(tile){

    };

    self.isMatchValid = function(){
        return true;
    };

    self.postMatch = function (gameId, tile1Id, tile2Id) {
        return $http.post(urlBase+"/"+gameId+"/Tiles/matches",{tile1Id: tile1Id, tile2Id: tile2Id});
    };

    return self;
};