/**
 * Created by Nevernown on 6-6-2016.
 */
var boardModule = angular.module('app.board', []);

var boardDirective = require("./board.directive");
var boardController = require("./board.controller");

boardModule.directive('board', boardDirective);
boardModule.controller('BoardController', boardController);

module.exports = boardModule;