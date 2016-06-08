var _ = require("underscore");

module.exports = function(MatchFactory, $scope){
    var self = this;

    self.isMatchValid = function(){
      return MatchFactory.isMatchValid();
    };

    self.postMatch = function(){
        var selectedTiles = MatchFactory.getSelectedTiles();

        MatchFactory.postMatch(self.gameId).success(function(response){

            var tile1 = response[0];
            var tile2 = response[1];

            self.tiles = _.filter(self.tiles, function(tile){ return ((tile._id != tile1._id) && (tile._id != tile2._id)); });

            self.matches.unshift({
                "foundBy" : tile1.match.foundBy,
                "foundOn": tile1.match.foundOn,
                "tile1Id": tile1._id,
                "tile1": selectedTiles[0].tile,
                "tile2Id":tile2._id,
                "tile2": selectedTiles[1].tile
            });
        });
    };

    var canSelect = function (tile) {
        var freeTop = !isTopBlocked(tile);
        var freeLeft = !isLeftBlocked(tile);
        var freeRight = !isRightBlocked(tile);

        return  (freeTop && freeLeft) || (freeTop && freeRight);
    };

    var isTopBlocked = function (tile) {
        var layer = tile.zPos + 1;
        var xRange = [tile.xPos - 1, tile.xPos, tile.xPos + 1];
        var yRange = [tile.yPos - 1, tile.yPos, tile.yPos + 1];

        var surface = _.flatten(_.map(xRange, function (x) {
            return _.map(yRange, function (y) {
               return {x: x, y: y, z: layer};
            });
        }));
        return hasTileAtAny(surface);
    };

    var isLeftBlocked = function (tile) {
        return ColumnBlocked(tile, -2);
    };

    var isRightBlocked = function (tile) {
        return ColumnBlocked(tile, 2);
    };

    var ColumnBlocked = function(tile, xOffset)
    {
        var layer = tile.zPos;
        var x = tile.xPos + xOffset;
        var yRange = [tile.yPos - 1, tile.yPos, tile.yPos + 1];
        var edge = _.map(yRange, function (y) {
            return {x: x, y: y, z: layer};
        });

        return hasTileAtAny(edge);
    };

    var hasTileAtAny = function (positions) {
        return _.any(self.tiles, function (tile) {
            return _.any(positions, function (pos) {
                return (tile.xPos == pos.x && tile.yPos == pos.y && tile.zPos == pos.z);
            });
        });
    };

    $scope.$watch('vm.gameId', function(newValue, oldValue){
        self.gameId = newValue;
    });

    $scope.$watch('vm.isMember', function(newValue, oldValue){
        self.isMember = newValue;
    });

    $scope.$watch('vm.tiles', function(newValue, oldValue){
        self.tiles = newValue;
    });

    $scope.$watch('vm.matches', function(newValue, oldValue){
        self.matches = newValue;
    });

    $scope.$on('tileSelected', function (event, data) {
        if(canSelect(data)){
            var toggled = MatchFactory.toggleTile(data);
            if(toggled !== undefined) { $scope.$broadcast('tileToggled', { state: toggled, target: data }); }
        }
    });
};