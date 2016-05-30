var directivesModule = angular.module('app.directives', []);

var navDirective = require("./nav.directive");
var tileDirective = require("./../tile/tile.directive.js");

directivesModule.directive('navbar', navDirective);
directivesModule.directive('tile', tileDirective);

module.exports = directivesModule;
