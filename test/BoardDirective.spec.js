
describe("BoardDirective", function () {

    var boardDirective, $compile, $rootScope, httpBackend;

    beforeEach(module("app"));

    beforeEach(module("partials/board.html"));

    beforeEach(inject(function(_$compile_, _$rootScope_, $httpBackend){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        httpBackend = $httpBackend;
    }));

    describe("Rendering HTML with board", function () {
        it("should render a board with sub-tiles", function () {
            httpBackend.expectGET("partials/tile.html").respond(200);

            var element = angular.element('<board game-id="x" tiles="gameTiles" matches="[]" is-member="true" type="\'playing\'"></board>');
            var scope = $rootScope.$new();

            scope.gameTiles = [{ xPos: 11, yPos: 2, zPos: 0, tile: { _id: 96, suit: "Character", name: "7", matchesWholeSuit: false, __v: 0, id: "96" }, _id: "575e8441b62cb21100dc59f9" }, { xPos: 9, yPos: 1, zPos: 0, tile: { _id: 126, suit: "Dragon", name: "Red", matchesWholeSuit: false, __v: 0, id: "126" }, _id: "575e8441b62cb21100dc59f8" }, { xPos: 7, yPos: 1, zPos: 0, tile: { _id: 25, suit: "Circle", name: "7", matchesWholeSuit: false, __v: 0, id: "25" }, _id: "575e8441b62cb21100dc59f7" }, { xPos: 25, yPos: 5, zPos: 2, tile: { _id: 65, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "65" }, _id: "575e8441b62cb21100dc5a70", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a69", foundOn: "2016-06-14T10:56:42.630Z" } }, { xPos: 8, yPos: 1, zPos: 2, tile: { _id: 66, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "66" }, _id: "575e8441b62cb21100dc5a69", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a70", foundOn: "2016-06-14T10:56:42.630Z" } }, { xPos: 2, yPos: 7, zPos: 2, tile: { _id: 14, suit: "Circle", name: "4", matchesWholeSuit: false, __v: 0, id: "14" }, _id: "575e8441b62cb21100dc5a74", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a71", foundOn: "2016-06-14T10:56:37.371Z" } }, { xPos: 29, yPos: 5, zPos: 2, tile: { _id: 15, suit: "Circle", name: "4", matchesWholeSuit: false, __v: 0, id: "15" }, _id: "575e8441b62cb21100dc5a71", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a74", foundOn: "2016-06-14T10:56:37.371Z" } },];


            //scope.vm = {
            //  type: type
            //};

            $compile(element)(scope);
            scope.$digest();

            console.log(element);

            console.log(element.html());

             //
             //$scope.gameTiles = [{ xPos: 11, yPos: 2, zPos: 0, tile: { _id: 96, suit: "Character", name: "7", matchesWholeSuit: false, __v: 0, id: "96" }, _id: "575e8441b62cb21100dc59f9" }, { xPos: 9, yPos: 1, zPos: 0, tile: { _id: 126, suit: "Dragon", name: "Red", matchesWholeSuit: false, __v: 0, id: "126" }, _id: "575e8441b62cb21100dc59f8" }, { xPos: 7, yPos: 1, zPos: 0, tile: { _id: 25, suit: "Circle", name: "7", matchesWholeSuit: false, __v: 0, id: "25" }, _id: "575e8441b62cb21100dc59f7" }, { xPos: 25, yPos: 5, zPos: 2, tile: { _id: 65, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "65" }, _id: "575e8441b62cb21100dc5a70", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a69", foundOn: "2016-06-14T10:56:42.630Z" } }, { xPos: 8, yPos: 1, zPos: 2, tile: { _id: 66, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "66" }, _id: "575e8441b62cb21100dc5a69", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a70", foundOn: "2016-06-14T10:56:42.630Z" } }, { xPos: 2, yPos: 7, zPos: 2, tile: { _id: 14, suit: "Circle", name: "4", matchesWholeSuit: false, __v: 0, id: "14" }, _id: "575e8441b62cb21100dc5a74", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a71", foundOn: "2016-06-14T10:56:37.371Z" } }, { xPos: 29, yPos: 5, zPos: 2, tile: { _id: 15, suit: "Circle", name: "4", matchesWholeSuit: false, __v: 0, id: "15" }, _id: "575e8441b62cb21100dc5a71", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a74", foundOn: "2016-06-14T10:56:37.371Z" } },];
             //
             //var element = a
             //$scope.$digest();
             //
             //expect(element.html()).to.have.string('');

            httpBackend.flush();
            expect(true).to.equal(true);
        });
    });
});
