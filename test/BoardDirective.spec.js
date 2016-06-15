
describe("BoardDirective", function () {

    var boardDirective, $compile, $rootScope, httpBackend;

    beforeEach(module("app", function($compileProvider){
        $compileProvider.directive('tile', function() {
            var fake = {
                priority: 100,
                terminal: true,
                restrict: 'E',
                template: '<div class="fake">Not the real thing.</div>',
            };
            return fake;
        });
    }));

    beforeEach(module("partials/board.html"));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    describe("Rendering HTML with board", function () {
        it("should render a board with sub-tiles", function () {

            var element = angular.element('<board game-id="x" tiles="gameTiles" matches="[]" is-member="true" type="\'playing\'"></board>');
            var scope = $rootScope.$new();

            scope.gameTiles = [{ xPos: 11, yPos: 2, zPos: 0, tile: { _id: 96, suit: "Character", name: "7", matchesWholeSuit: false, __v: 0, id: "96" }, _id: "575e8441b62cb21100dc59f9" }, { xPos: 9, yPos: 1, zPos: 0, tile: { _id: 126, suit: "Dragon", name: "Red", matchesWholeSuit: false, __v: 0, id: "126" }, _id: "575e8441b62cb21100dc59f8" }, { xPos: 7, yPos: 1, zPos: 0, tile: { _id: 25, suit: "Circle", name: "7", matchesWholeSuit: false, __v: 0, id: "25" }, _id: "575e8441b62cb21100dc59f7" }, { xPos: 25, yPos: 5, zPos: 2, tile: { _id: 65, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "65" }, _id: "575e8441b62cb21100dc5a70", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a69", foundOn: "2016-06-14T10:56:42.630Z" } }, { xPos: 8, yPos: 1, zPos: 2, tile: { _id: 66, suit: "Bamboo", name: "8", matchesWholeSuit: false, __v: 0, id: "66" }, _id: "575e8441b62cb21100dc5a69", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a70", foundOn: "2016-06-14T10:56:42.630Z" } }, { xPos: 2, yPos: 7, zPos: 2, tile: { _id: 14, suit: "Circle", name: "4", matchesWholeSuit: false, __v: 0, id: "14" }, _id: "575e8441b62cb21100dc5a74", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a71", foundOn: "2016-06-14T10:56:37.371Z" } }, { xPos: 29, yPos: 5, zPos: 2, tile: { _id: 15, suit: "Circle", name: "4", matchesWholeSuit: false, __v: 0, id: "15" }, _id: "575e8441b62cb21100dc5a71", match: { foundBy: "ca.boel@student.avans.nl", otherTileId: "575e8441b62cb21100dc5a74", foundOn: "2016-06-14T10:56:37.371Z" } },];

            $compile(element)(scope);
            scope.$digest();

            expect(element.html()).to.have.string('No matches found yet.');
            expect(element.html()).to.have.string('<div ng-show="!vm.tiles" class="ng-hide">');
            expect(element.html()).to.have.string('<div class="tile-container">');
            expect(element.html()).to.have.string('<div class="matches-container">');
            var tiles = element.html().match(/Not\sthe\sreal\sthing/g || []);
            expect(tiles.length).to.equal(3);
        });
    });
});
