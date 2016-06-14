describe("Gameboard", function () {

    var scope, gameController, httpBackend, createFilter;

    var game = {"_id":"575e8441b62cb21100dc59f6","createdBy":{"_id":"ca.boel@student.avans.nl","name":"Conno Boel","__v":0},"createdOn":"2016-06-13T10:00:33.447Z","gameTemplate":{"_id":"Dragon","__v":0,"id":"Dragon"},"__v":0,"startedOn":"2016-06-13T10:00:42.237Z","players":[{"_id":"ca.boel@student.avans.nl","name":"Conno Boel","__v":0,"numberOfMatches":11}],"maxPlayers":1,"minPlayers":1,"state":"playing","id":"575e8441b62cb21100dc59f6"};
    var tiles = [{ xPos: 11, yPos: 2, zPos: 0, tile: { _id: 96, suit: "Character", name: "7", matchesWholeSuit: false, __v: 0, id: "96" }, _id: "575e8441b62cb21100dc59f9" }, { xPos: 9, yPos: 1, zPos: 0, tile: { _id: 126, suit: "Dragon", name: "Red", matchesWholeSuit: false, __v: 0, id: "126" }, _id: "575e8441b62cb21100dc59f8" }, { xPos: 7, yPos: 1, zPos: 0, tile: { _id: 25, suit: "Circle", name: "7", matchesWholeSuit: false, __v: 0, id: "25" }, _id: "575e8441b62cb21100dc59f7" }, { xPos: 25, yPos: 5, zPos: 2, tile: { _id: 65, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "65" }, _id: "575e8441b62cb21100dc5a70", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a69", foundOn: "2016-06-14T10:56:42.630Z" } }, { xPos: 8, yPos: 1, zPos: 2, tile: { _id: 66, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "66" }, _id: "575e8441b62cb21100dc5a69", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a70", foundOn: "2016-06-14T10:56:42.630Z" } }, { xPos: 2, yPos: 7, zPos: 2, tile: { _id: 14, suit: "Circle", name: "4", matchesWholeSuit: false, __v: 0, id: "14" }, _id: "575e8441b62cb21100dc5a74", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a71", foundOn: "2016-06-14T10:56:37.371Z" } }, { xPos: 29, yPos: 5, zPos: 2, tile: { _id: 15, suit: "Circle", name: "4", matchesWholeSuit: false, __v: 0, id: "15" }, _id: "575e8441b62cb21100dc5a71", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a74", foundOn: "2016-06-14T10:56:37.371Z" } },];
    var matches = [{xPos: 25, yPos: 5, zPos: 2, tile: {_id: 65, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "65"}, _id: "575e8441b62cb21100dc5a70", match: {foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a69", foundOn: "2016-06-14T10:56:42.630Z"}}, {xPos: 8, yPos: 1, zPos: 2, tile: {_id: 66, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "66"}, _id: "575e8441b62cb21100dc5a69", match: {foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a70", foundOn: "2016-06-14T10:56:42.630Z"}}, {xPos: 2, yPos: 7, zPos: 2, tile: {_id: 14, suit: "Circle", name: "4", matchesWholeSuit: false, __v: 0, id: "14"}, _id: "575e8441b62cb21100dc5a74", match: {foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a71", foundOn: "2016-06-14T10:56:37.371Z"}}, {xPos: 29, yPos: 5, zPos: 2, tile: {_id: 15, suit: "Circle", name: "4", matchesWholeSuit: false, __v: 0, id: "15"}, _id: "575e8441b62cb21100dc5a71", match: {foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a74", foundOn: "2016-06-14T10:56:37.371Z"}}];

    beforeEach(function () {

        //Is gelijk aan ng-app="app"
        module("app", function ($provide) {
            $provide.value('AuthFactory', {
                isLoggedIn: sinon.stub().returns(true),
                getToken: sinon.stub().returns('token'),
                getUsername: sinon.stub().returns('test@avans.nl')
            });
        });
        
        //Angular is een blackbox, maar wij willen van angular onderdelen kunnen opvragen
        inject(function ($rootScope, $controller, $injector, $httpBackend, $filter) {
            httpBackend = $httpBackend;
            scope = $rootScope.$new();

            createFilter = function() {
                return $filter('matchfilter');
            };

            gameController = $controller('GameController', {$scope: scope, game: game}); //ng-controller="??"
        })
    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe("getGameData", function () {
        it("should return tiles", function () {
            httpBackend.expectGET('http://mahjongmayhem.herokuapp.com/games/575e8441b62cb21100dc59f6/Tiles').respond(200, tiles);
            httpBackend.expectGET('http://mahjongmayhem.herokuapp.com/games/575e8441b62cb21100dc59f6/Tiles/matches').respond(200, matches);

            gameController.initSocket = sinon.stub();
            gameController.init();

            httpBackend.flush();

            expect(gameController.gameTiles).to.have.length(7);
        });
        it("should return matches", function () {
            httpBackend.expectGET('http://mahjongmayhem.herokuapp.com/games/575e8441b62cb21100dc59f6/Tiles').respond(200, tiles);
            httpBackend.expectGET('http://mahjongmayhem.herokuapp.com/games/575e8441b62cb21100dc59f6/Tiles/matches').respond(200, matches);

            gameController.initSocket = sinon.stub();
            gameController.init();

            httpBackend.flush();

            expect(gameController.gameMatches).to.have.length(2);
        });
    });


    describe("filterTile", function () {

        it('should return tiles without a match', inject(function($filter) {
            var filteredTiles = $filter('matchfilter')(tiles);
            expect(filteredTiles).to.deep.equal([
                { xPos: 11, yPos: 2, zPos: 0, tile: { _id: 96, suit: "Character", name: "7", matchesWholeSuit: false, __v: 0, id: "96" }, _id: "575e8441b62cb21100dc59f9" },
                { xPos: 9, yPos: 1, zPos: 0, tile: { _id: 126, suit: "Dragon", name: "Red", matchesWholeSuit: false, __v: 0, id: "126" }, _id: "575e8441b62cb21100dc59f8" },
                { xPos: 7, yPos: 1, zPos: 0, tile: { _id: 25, suit: "Circle", name: "7", matchesWholeSuit: false, __v: 0, id: "25" }, _id: "575e8441b62cb21100dc59f7" }]);
        }));

        it('should return tiles by timestamp <=', inject(function($filter) {
            var filteredTiles = $filter('matchfilter')(tiles, '2016-06-14T10:56:42.630Z');
            var expectedTiles = [
                { xPos: 11, yPos: 2, zPos: 0, tile: { _id: 96, suit: "Character", name: "7", matchesWholeSuit: false, __v: 0, id: "96" }, _id: "575e8441b62cb21100dc59f9" },
                { xPos: 9, yPos: 1, zPos: 0, tile: { _id: 126, suit: "Dragon", name: "Red", matchesWholeSuit: false, __v: 0, id: "126" }, _id: "575e8441b62cb21100dc59f8" },
                { xPos: 7, yPos: 1, zPos: 0, tile: { _id: 25, suit: "Circle", name: "7", matchesWholeSuit: false, __v: 0, id: "25" }, _id: "575e8441b62cb21100dc59f7" },
                { xPos: 25, yPos: 5, zPos: 2, tile: { _id: 65, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "65" }, _id: "575e8441b62cb21100dc5a70", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a69", foundOn: "2016-06-14T10:56:42.630Z" },matchHighlight:true },
                { xPos: 8, yPos: 1, zPos: 2, tile: { _id: 66, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "66" }, _id: "575e8441b62cb21100dc5a69", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a70", foundOn: "2016-06-14T10:56:42.630Z" }, matchHighlight:true }
            ];

            var filteredTilesSameTimestamp = _.filter(filteredTiles, function(obj) {
                if(obj.match){
                    return obj.match.foundOn == '2016-06-14T10:56:42.630Z';
                }
            });

            expect(filteredTiles).to.deep.equal(expectedTiles);
            expect(_.where(filteredTilesSameTimestamp, { 'matchHighlight': true})).to.have.length(2);
        }));

    });

});
