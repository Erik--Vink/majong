module.exports = function($rootScope, $scope){
    var self = this;

    $rootScope.$watch('selectedTheme', function(newValue){
       self.selectedTheme = newValue;
    },true);
};

