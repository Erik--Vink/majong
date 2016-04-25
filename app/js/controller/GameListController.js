/**
 * Created by Nevernown on 22-4-2016.
 */

module.exports = function($scope, $http){
    var self = this;
    self.games = [];
    self.errors = [];

    $http({
        method: "GET",
        url: "https://mahjongmayhem.herokuapp.com/Games"
    }).then(function (response) {
        self.games = response.data;
    }, function (err) {
        errors.push(err);
    });
};