require('angular/angular.min');
require('jquery/dist/jquery.min');
require('angular-ui-router/release/angular-ui-router.min');
require('angular-bootstrap-npm/dist/angular-bootstrap.min');
require('angular-bootstrap-npm/dist/angular-bootstrap-tpls.min');

var app = angular.module("app", [
    "app.core",
    "app.theme",
    "app.auth",
    "app.socket",
    "app.game",
    "app.directives",
    "app.http",
    "app.board"
]);

require("./config/core.module");
require("./components/directives/directives.module");
require("./components/auth/auth.module");
require("./components/socket/socket.module");
require("./components/game/game.module");
require("./config/http.module");
require("./components/board/board.module");
require("./components/theme/theme.module");

app.config(function($provide) {
    $provide.decorator('$state', function($delegate) {
        $delegate.reinit = function() {
            this.transitionTo(this.current, this.$current.params, { reload: true, inherit: true, notify: true });
        };
        return $delegate;
    });
});

app.run(function (AuthFactory, $state, $rootScope, ThemeService) {
    $rootScope.$on("$stateChangeStart",
        function (event, toState, toParams, fromState, fromParams) {
            if(!AuthFactory.isLoggedIn() && toState.name != 'login' && toState.name != 'authcallback'){
                $state.transitionTo('login');
                event.preventDefault();
            }
        });

    $rootScope.selectedTheme = ThemeService.getTheme();
});