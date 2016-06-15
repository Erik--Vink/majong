var _ = require("underscore");

module.exports = function($window, $rootScope){
    var self = this;
    var tileSets = {
        tileset1: {name:'tileset1', spacingX :34, spacingY:44, negativeSpacingY:0, sideSpacingX:4, sideSpacingY:4},
        tileset2: {name:'tileset2',spacingX :30, spacingY:45, negativeSpacingY:100, sideSpacingX:8, sideSpacingY:8}
    };

    var themes = [
        {name: 'Light', path:'css/themes/theme1.css', tileSet:tileSets.tileset1},
        {name: 'Greenish', path:'css/themes/theme2.css', tileSet:tileSets.tileset2}
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
