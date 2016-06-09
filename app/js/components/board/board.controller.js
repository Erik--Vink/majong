var _ = require("underscore");

module.exports = function(MatchFactory, $scope, SocketService, $filter){
    var self = this;

    self.isMatchValid = function(){
        return MatchFactory.isMatchValid();
    };

    self.postMatch = function(){
        var selectedTiles = MatchFactory.getSelectedTiles();

        MatchFactory.postMatch(self.gameId);
    };

    self.solve = function(){
        self.solving = true;
        solveOne();
    };

    self.highlightMatch = function(match){
        self.selectedMatchTimestamp = match.foundOn;
    };

    self.hint = function(){
        var matching = hints();
        var a = matching[0].tile;
        var b = matching[0].matches[0];
        MatchFactory.clearSelectedTiles();
        var toggledA = MatchFactory.toggleTile(a);
        if(toggledA !== undefined) { $scope.$broadcast('tileToggled', { state: toggledA, target: a }); }
        var toggledB = MatchFactory.toggleTile(b);
        if(toggledB !== undefined) { $scope.$broadcast('tileToggled', { state: toggledB, target: b }); }
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

    var addMatchToBoard = function(matches){
        var tile1 = matches[0];
        var tile2 = matches[1];

        tile1.tile = _.find(self.tiles, function(tile){ return tile._id == tile1._id }).tile;
        tile2.tile = _.find(self.tiles, function(tile){ return tile._id == tile2._id }).tile;

        self.tiles = _.filter(self.tiles, function(tile){ return ((tile._id != tile1._id) && (tile._id != tile2._id)); });

        self.matches.unshift({
            "foundBy" : tile1.match.foundBy,
            "foundOn": tile1.match.foundOn,
            "tile1Id": tile1._id,
            "tile1": tile1.tile,
            "tile2Id":tile2._id,
            "tile2": tile2.tile
        });
        $scope.$apply();
    };

    var initSocket = function(){
        gameSocket = SocketService.createConnection(self.gameId);

        gameSocket.on('match', function (response) {
            MatchFactory.clearSelectedTiles();
            addMatchToBoard(response);
        });
    };

    $scope.$watch('vm.gameId', function(newValue, oldValue){
        self.gameId = newValue;
        initSocket();
    });

    $scope.$watch('vm.type', function(newValue, oldValue){
        self.type = newValue;
    });

    $scope.$watch('vm.isMember', function(newValue, oldValue){
        self.isMember = newValue;
    });

    $scope.$watch('vm.tiles', function(newValue, oldValue){
        self.tiles = newValue;
    });

    $scope.$watch('vm.matches', function(newValue, oldValue){
        self.matches = newValue;

        // CHEATS
        if(self.solving && self.hints().length > 0) { solveOne(); }
    });

    $scope.$on('tileSelected', function (event, data) {
        if(canSelect(data)){
            var toggled = MatchFactory.toggleTile(data);
            if(toggled !== undefined) { $scope.$broadcast('tileToggled', { state: toggled, target: data }); }
        }
    });
    
    // CHEATS
    var selectable = function(){
        var tiles = $filter('matchfilter')(self.tiles);
        var selectable = _.reduce(tiles, function (collector, tile) {
            if(canSelect(tile)){ collector.push(tile); }
            return collector;
        }, []);
        return selectable;
    };

    var same = function(tileA, tileB){ return tileA.xPos == tileB.xPos && tileA.yPos == tileB.yPos && tileA.zPos == tileB.zPos; };
    var match = function (tileA, tileB) { return tileA.tile.suit == tileB.tile.suit && (tileA.tile.name == tileB.tile.name || (tileA.tile.matchesWholeSuit && tileB.tile.matchesWholeSuit)); };

    var hints = function () {
        var toMatch = selectable();
        var matching = [];

        _.forEach(selectable(), function (curr) {
            var matches = _.reduce(toMatch, function (collector, tile) {
                if(!same(tile, curr) && match(tile, curr)) { collector.push(tile); }
                return collector;
            }, []);

            if(matches.length > 0) {
                matching.push({ tile: curr, matches: matches});

                toMatch = _.where(toMatch, function (tile) {
                    return _.all(matches, function (matchedTile) { return !same(matchedTile, tile); });
                });
            }
        });
        return matching;
    };

    var solveOne = function () {
        var matching = hints();
        var a = matching[0].tile;
        var b = matching[0].matches[0];
        MatchFactory.toggleTile(a);
        MatchFactory.toggleTile(b);
        self.postMatch();
    };
};