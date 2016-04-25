/**
 * Created by Nevernown on 25-4-2016.
 */

describe("GameListController", function () {
    
    var gameFactory;
    var scope;
    var gameListController;
    
    beforeEach(function () {
        module("app");
        
        
        inject(function ($rootScope, $controller, $injector) {
            scope = $rootScope.$new();
            gameFactory = $injector.get('GameFactory');
            gameListController = $controller('gameListController', {$scope: scope});
        })
    });
    
    describe("getGames", function () {
        it("should return 2 games", function () {
            GameListController.newGame();
            expect(scope.game).to.not.be.undefined;
        });
    });
});
