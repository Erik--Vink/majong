/**
 * Created by Nevernown on 25-4-2016.
 */

describe("GameListController", function () {

    var $httpBackend, gameService, scope, gameListController, localStorageService, authFactoryStub;

    beforeEach(function () {

        //Is gelijk aan ng-app="app"
        module("app");
        
        //Angular is een blackbox, maar wij willen van angular onderdelen kunnen opvragen
        inject(function ($rootScope, $controller, $injector) {
            $httpBackend = $injector.get('$httpBackend');
            scope = $rootScope.$new();

            authFactoryStub = $injector.get('AuthFactory'); // exports = function(???, ???, ???){
            authFactoryStub.isLoggedIn = sinon.stub();
            authFactoryStub.isLoggedIn.returns(true);

            gameService = $injector.get('GameService'); // exports = function(???, ???, ???){
            gameService = sinon.mock();

            var gameListParams = {createdBy : null, player: null, gameTemplate: null, state: null};
            gameListController = $controller('GamelistController', {$scope: scope, params: gameListParams, showFilter:true}); //ng-controller="??"
        })
    });

    afterEach(function() {
        //$httpBackend.verifyNoOutstandingExpectation();
        //$httpBackend.verifyNoOutstandingRequest();
    });

    describe("getGames", function () {
        it("should return games", function () {
            $httpBackend.expectGET('http://mahjongmayhem.herokuapp.com/games').respond(200);
            $httpBackend.expectGET('http://mahjongmayhem.herokuapp.com/gamestates').respond(200);
            $httpBackend.expectGET('http://mahjongmayhem.herokuapp.com/GameTemplates').respond(200);

            gameListController.init();

            $httpBackend.flush();

            //GameListController.newGame();
            //expect(scope.game).to.not.be.undefined;
            expect(true).to.equal(false)
        });
    });
});
