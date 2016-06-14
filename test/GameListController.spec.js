/**
 * Created by Nevernown on 25-4-2016.
 */

describe("GameListController", function () {

    var $httpBackend, scope, gameListController, httpBackend ;

    var games = [
        {
            _id: "575e8441b62cb21100dc59f6",
            createdBy: {
                _id: "ca.boel@student.avans.nl",
                name: "Conno Boel",
                __v: 0
            },
            createdOn: "2016-06-13T10:00:33.447Z",
            gameTemplate: {
                _id: "Dragon",
                __v: 0,
                id: "Dragon"
            },
            __v: 0,
            startedOn: "2016-06-13T10:00:42.237Z",
            players: [
                {
                    _id: "ca.boel@student.avans.nl",
                    name: "Conno Boel",
                    __v: 0
                }
            ],
            maxPlayers: 1,
            minPlayers: 1,
            state: "playing",
            id: "575e8441b62cb21100dc59f6"
        },
        {
            _id: "575ac17919c12511003e61b4",
            createdBy: {
                _id: "gnp.iwanow@student.avans.nl",
                name: "Guus Iwanow",
                __v: 0
            },
            createdOn: "2016-06-10T13:32:41.562Z",
            gameTemplate: {
                _id: "Shanghai",
                __v: 0,
                id: "Shanghai"
            },
            __v: 1,
            startedOn: "2016-06-10T13:39:09.910Z",
            players: [
                {
                    _id: "gnp.iwanow@student.avans.nl",
                    name: "Guus Iwanow",
                    __v: 0
                },
                {
                    _id: "ca.boel@student.avans.nl",
                    name: "Conno Boel",
                    __v: 0
                }
            ],
            maxPlayers: 2,
            minPlayers: 2,
            state: "playing",
            id: "575ac17919c12511003e61b4"
        }
    ];

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
        inject(function ($rootScope, $controller, $injector, $httpBackend) {
            httpBackend = $httpBackend;
            scope = $rootScope.$new();

            var gameListParams = {createdBy : null, player: null, gameTemplate: null, state: null};
            gameListController = $controller('GamelistController', {$scope: scope, params: gameListParams, showFilter:true}); //ng-controller="??"
        })
    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe("getGames", function () {
        it("should return 2 games", function () {
            httpBackend.expectGET('http://mahjongmayhem.herokuapp.com/games').respond(200, games);
            httpBackend.expectGET('http://mahjongmayhem.herokuapp.com/gamestates').respond(200);
            httpBackend.expectGET('http://mahjongmayhem.herokuapp.com/GameTemplates').respond(200);

            gameListController.init();

            httpBackend.flush();

            expect(gameListController.games).to.have.length(2);
        });
    });
});
