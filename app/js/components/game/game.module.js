var gameModule = angular.module('app.game', []);

var gameRoutes = require("./game.route");
var gamelistController = require("./gamelist.controller");
var gameController = require("./game.controller");
var newgameModalController = require("./newgameModal.controller");
var gameService = require("./game.service.js");

var matchFactory = require("./../match/match.factory.js");
var matchFilter = require("./../match/match.filter");

gameModule.service("GameService", gameService);
gameModule.factory("MatchFactory", matchFactory);
gameModule.controller('GamelistController', gamelistController);
gameModule.controller('GameController', gameController);
gameModule.controller('NewgameModalController', newgameModalController);
gameModule.filter('matchfilter', matchFilter);
gameModule.config(gameRoutes);

module.exports = gameModule;
