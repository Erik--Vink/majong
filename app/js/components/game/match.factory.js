var _ = require('underscore');

module.exports = function($http, apiUrl){
    var self = this;
    var urlBase = apiUrl+'games';

    var maxSelectedTiles = 2;
    var selectedTiles = [];

    self.toggleTile = function (tile) {
        if(_.contains(selectedTiles, tile)) {
            selectedTiles = _.without(selectedTiles, tile);
            return false;
        } else if(selectedTiles.length < maxSelectedTiles) {
            selectedTiles.push(tile);
            return true;
        }
    };

    self.isMatchValid = function(){
        if (selectedTiles.length < maxSelectedTiles) { return false; }
        var first = selectedTiles[0];
        var second = selectedTiles[1];

        return first.tile.suit == second.tile.suit && ((first.tile.matchesWholeSuit && second.tile.matchesWholeSuit) || first.tile.name == second.tile.name);
    };

    self.postMatch = function (gameId) {
        var tile1Id = selectedTiles[0]._id;
        var tile2Id = selectedTiles[1]._id;

        return $http.post(urlBase+"/"+gameId+"/Tiles/matches",{tile1Id: tile1Id, tile2Id: tile2Id}).success(function(response){
            selectedTiles = [];
        });
    };

    self.getSelectedTiles = function(){
      return selectedTiles;
    };

    return self;
};