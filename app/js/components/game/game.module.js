var gameModule = angular.module('app.game', []);

var gameRoutes = require("./game.route");
var gamelistController = require("./gamelist.controller");
var gameController = require("./game.controller");
var newgameModalController = require("./newgameModal.controller");
var gameService = require("./game.service.js");

gameModule.service("GameService", gameService);
gameModule.controller('GamelistController', gamelistController);
gameModule.controller('GameController', gameController);
gameModule.controller('NewgameModalController', newgameModalController);
gameModule.config(gameRoutes);

module.exports = gameModule;
