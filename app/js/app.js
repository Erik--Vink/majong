require('angular/angular.min');
require('angular-ui-router/release/angular-ui-router.min');
require('angular-bootstrap-npm/dist/angular-bootstrap.min');
require('angular-bootstrap-npm/dist/angular-bootstrap-tpls.min');

var app = angular.module("app", [
    "app.core",
    //"app.user",
    "app.game"
]);

//require the module dependencies
//require("./components/user/user.module");
require("./config/core.module");
require("./components/game/game.module");

//var routesConfig = require("./config/routes");
//
//var userFactory = require("./services/UserFactory");
//var gameFactory = require("./services/GameFactory");
//var gameListController = require("./components/game/GameListController");
//
//app.factory("UserFactory", userFactory);
//app.factory("GameFactory", ['UserFactory', gameFactory]);
//app.controller('GameListController',  gameListController);
//
//app.config(routesConfig);