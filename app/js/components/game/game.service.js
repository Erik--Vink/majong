module.exports = function($http, apiUrl){
    var urlBase = apiUrl+'games';

    this.getGames = function (created, player, template, state) {
        var params = {};
        if(created){ params.createdBy = created; }
        if(player){ params.player = player; }
        if(template){ params.gameTemplate = template; }
        if(state){ params.state = state; }

        return $http.get(urlBase, { params: params});
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