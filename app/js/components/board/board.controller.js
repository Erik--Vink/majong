var _ = require("underscore");

module.exports = function(MatchFactory, $scope){
    var self = this;

    //self.SelectTile = function (tile) {
    //    if(self.canSelect(tile))
    //    {
    //        MatchFactory.AddTile(tile);
    //    }
    //};

    self.canSelect = function (tile) {
        var freeTop = !self.isTopBlocked(tile);
        var freeLeft = !self.isLeftBlocked(tile);
        var freeRight = !self.isRightBlocked(tile);
        console.log("top" + freeTop);
        console.log("left" + freeLeft);
        console.log("right" + freeRight);

        return  (freeTop && freeLeft) || (freeTop && freeRight);
    };

    self.isTopBlocked = function (tile) {
        var layer = tile.zPos + 1;
        var xRange = [tile.xPos - 1, tile.xPos, tile.xPos + 1];
        var yRange = [tile.yPos - 1, tile.yPos, tile.yPos + 1];

        var surface = _.flatten(_.map(xRange, function (x) {
            return _.map(yRange, function (y) {
               return {x: x, y: y, z: layer};
            });
        }));
        return self.hasTileAtAny(surface);
    };

    self.isLeftBlocked = function (tile) {
        return self.ColumnBlocked(tile, -2);
    };

    self.isRightBlocked = function (tile) {
        return self.ColumnBlocked(tile, 2);
    };

    self.ColumnBlocked = function(tile, xOffset)
    {
        var layer = tile.zPos;
        var x = tile.xPos + xOffset;
        var yRange = [tile.yPos - 1, tile.yPos, tile.yPos + 1];
        var edge = _.map(yRange, function (y) {
            return {x: x, y: y, z: layer};
        });

        return self.hasTileAtAny(edge);
    };

    self.hasTileAtAny = function (positions) {
        return _.any(self.tiles, function (tile) {
            return _.any(positions, function (pos) {
                return (tile.xPos == pos.x && tile.yPos == pos.y && tile.zPos == pos.z);
            });
        });
    };

    $scope.$watch('tiles', function(newValue, oldValue){
        self.tiles = newValue;
    });

    $scope.$on('tileSelected', function (event, data) {
        if(self.canSelect(data)){
            var toggled = MatchFactory.toggleTile(data);
            if(toggled !== undefined) { $scope.$broadcast('tileToggled', { state: toggled, target: data }); }
        }
    });
};