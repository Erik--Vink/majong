require('angular/angular.min');
require('jquery/dist/jquery.min');
require('angular-ui-router/release/angular-ui-router.min');
require('angular-bootstrap-npm/dist/angular-bootstrap.min');
require('angular-bootstrap-npm/dist/angular-bootstrap-tpls.min');

var app = angular.module("app", [
    "app.core",
    "app.auth",
    "app.game",
    "app.directives",
    "app.http"
]);

require("./config/core.module");
require("./components/directives/directives.module");
require("./components/auth/auth.module");
require("./components/game/game.module");
require("./config/http.module");

app.run(function (AuthFactory, $state, $rootScope) {
    $rootScope.$on("$stateChangeStart",
        function (event, toState, toParams, fromState, fromParams) {
            if(!AuthFactory.isLoggedIn() && toState.url != '/login' ){
                $state.transitionTo('login');
                event.preventDefault();
            }
        });
});