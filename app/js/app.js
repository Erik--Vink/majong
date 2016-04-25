require('angular/angular.min');
require('angular-ui-router/release/angular-ui-router.min');
require('angular-bootstrap-npm/dist/angular-bootstrap.min.js');
require('angular-bootstrap-npm/dist/angular-bootstrap-tpls.min.js');

var app = angular.module("app", ["ui.router", "ui.bootstrap"]);

var routesConfig = require("./config/routes");

var userFactory = require("./services/UserFactory");
var gameFactory = require("./services/GameFactory");
var gameListController = require("./controllers/GameListController");

app.factory("UserFactory", userFactory);
app.factory("GameFactory", ['UserFactory', gameFactory]);
app.controller('GameListController',  gameListController);

app.config(routesConfig);