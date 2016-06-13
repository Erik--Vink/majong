module.exports = function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/nav.html',
        controller: function($state, $scope, $rootScope, AuthFactory, ThemeService) {
            $scope.isLoggedIn = AuthFactory.isLoggedIn;
            $scope.currentUsername = AuthFactory.getUsername();
            $scope.themes = ThemeService.getThemes();

            $scope.changeTheme = function(theme){
                ThemeService.setTheme(theme);
            };

            $scope.logOut = function(){
                AuthFactory.logOut();
                $state.transitionTo('login');
            }
        }
    };
};