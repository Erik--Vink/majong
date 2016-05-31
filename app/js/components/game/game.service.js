module.exports = function($http, apiUrl){
    var urlBase = apiUrl+'games';

    this.getGames = function (params) {
        if(params){ return $http.get(urlBase, { params: params}); }
        else { return $http.get(urlBase); }
    };

    this.getGame = function(id) {
        return $http.get(urlBase+"/"+id);
    };

    this.getGameTiles = function(id){
        return $http.get(urlBase+"/"+id+"/Tiles");
    };

    this.getGameTemplates = function() {
        return $http.get(apiUrl+"GameTemplates");
    };

    this.getGameStates = function() {
        return $http.get(apiUrl+"gamestates");
    };

    this.createGame = function(newGame){
        return $http.post(urlBase, newGame);
    };

    this.joinGame = function(game){
        return $http.post(urlBase+"/"+game.id+"/Players");
    };

    this.startGame = function(game){
        return $http.post(urlBase+"/"+game.id+"/Start");
    };
};