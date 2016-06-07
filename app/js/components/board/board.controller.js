var _ = require("underscore");

module.exports = function(MatchFactory, $scope){
    var self = this;

    self.board = $scope.tiles;

    self.SelectTile = function (tile) {
        if(self.canSelect(tile))
        {
            MatchFactory.AddTile(tile);
        }
    };

    self.canSelect = function (tile) {
        return (!self.topBlocked(tile) && (!self.leftBlocked(tile) || self.rightBlocked(tile)));
    };

    self.topBlocked = function (tile) {
        var layer = tile.zPos + 1;
        var xRange = [tile.xPos - 1, tile.xPos, tile.xPos + 1];
        var yRange = [tile.yPos - 1, tile.yPos, tile.yPos + 1];

        var surface = _.flatten(_.map(xRange, function (x) {
            return _.map(yRange, function (y) {
               return {x: x, y: y};
            });
        }));

        return _.any(self.board, function (tile) {
                _.any(surface, function (pos) {
                    return (tile.zPos == layer && tile.xPos == pos.x && tile.yPos == poz.z);
                })
            });
    };

    self.leftBlocked = function (tile) {

    };

    self.rightBlocked = function (tile) {

    };

    $scope.$on('tileSelected', function (event, data) {
        console.log(data); // 'data = tile object'
    });
};