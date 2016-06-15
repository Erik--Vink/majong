var _ = require("underscore");

module.exports = function($window, $rootScope){
    var self = this;
    var themes = [
        {name: 'Light', path:'css/themes/theme1.css', tileSprite: 'tileset1'},
        {name: 'Greenish', path:'css/themes/theme2.css', tileSprite: 'tileset2'} 
    ];

    self.getThemes = function(){
        return themes;
    };

    self.getTheme = function(){
        return $window.localStorage['mahjong-theme']?JSON.parse($window.localStorage['mahjong-theme']):_.first(self.getThemes());
    };

    self.setTheme = function(theme){
        $window.localStorage['mahjong-theme'] = JSON.stringify(theme);
        $rootScope.selectedTheme = theme;
    };
};