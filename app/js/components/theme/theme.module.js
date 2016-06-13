var themeModule = angular.module('app.theme', []);

var themeService = require("./theme.service");
var themeController = require("./theme.controller");

themeModule.service("ThemeService", themeService);
themeModule.controller("ThemeController", themeController);

module.exports = themeModule;
