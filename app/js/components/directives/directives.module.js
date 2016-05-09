var directivesModule = angular.module('app.directives', []);

var navDirective = require("./nav.directive");

directivesModule.directive('navbar', navDirective);

module.exports = directivesModule;
