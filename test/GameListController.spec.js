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
            gameListController = $controller
        })
    });
    
    describe("getGames", function () {
        it("should return 2 games", function () {
            
        });
    });
});
