var httpModule = angular.module('app.http', []);

var httpInterceptor = require("./http.interceptor");
httpModule.factory('httpRequestInterceptor', httpInterceptor);

httpModule.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');
});
