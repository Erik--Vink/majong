module.exports = function ($scope, $uibModalInstance, gameTemplates) {

    $scope.gameTemplates = gameTemplates;
    $scope.selectedTemplate = gameTemplates[0];
    $scope.newgame = {"templateName": gameTemplates[0].id,"minPlayers": 2,"maxPlayers": 32};

    $scope.createDisabled = function(){
        return !($scope.newgame.minPlayers && $scope.newgame.maxPlayers && $scope.newgame.templateName);
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.newgame);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};