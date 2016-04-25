require('angular/angular.min');

var app = angular.module("app", []);

var userFactory = require("./service/UserFactory");
var gameFactory = require("./service/GameFactory");
var gameListController = require("./controller/GameListController");

console.log(gameFactory());

app.factory("UserFactory", userFactory);
app.factory("GameFactory", ['UserFactory', gameFactory]);
app.controller('GameListController', ['$scope', '$http', 'GameFactory', gameListController]);