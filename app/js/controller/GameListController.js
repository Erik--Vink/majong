module.exports = function($scope, $http, GameFactory){
    var self = this;
    self.games = GameFactory.games;
    self.errors = [];

    //$http({
    //    method: "GET",
    //    url: "https://mahjongmayhem.herokuapp.com/Games"
    //}).then(function (response) {
    //    self.games = response.data;
    //}, function (err) {
    //    errors.push(err);
    //});
};

