module.exports = function($http, apiUrl){
    var urlBase = apiUrl+'games';

    this.postMatch = function (tile1Id, tile2Id) {
        return $http.post(urlBase,{tile1Id: tile1Id, tile2Id: tile2Id});
    };
};