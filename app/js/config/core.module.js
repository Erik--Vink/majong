var coreModule = angular.module('app.core', [
    "ui.router",
    "ui.bootstrap"
]);

//constants
coreModule.constant('apiUrl', "http://mahjongmayhem.herokuapp.com/");

//global routes
var coreRoutes = require("./core.route");
coreModule.config(coreRoutes);

module.exports = coreModule;