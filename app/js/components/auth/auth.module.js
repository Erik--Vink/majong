var authModule = angular.module('app.auth', []);

var authRoutes = require("./auth.route");
var authFactory = require("./auth.factory");

authModule.service("AuthFactory", authFactory);
authModule.config(authRoutes);

module.exports = authModule;
