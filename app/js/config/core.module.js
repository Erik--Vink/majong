var coreModule = angular.module('app.core', [
    "ui.router",
    "ui.bootstrap"
]);

//global directives
var navDirective = require("../components/directives/nav.directive");

coreModule.directive('navbar', navDirective);

//constants
coreModule.constant('apiUrl', "http://mahjongmayhem.herokuapp.com/");

module.exports = coreModule;