module.exports = function($timeout){
    return {
        GET: function(callBack){
                var games = [
                    {
                        "_id":"571dd32f3d3c3311009985ef",
                        "createdBy":{
                            "_id":"j.vanderschoot1@student.avans.nl",
                            "name":"Jelmer van der Schoot",
                            "__v":0
                        },
                        "createdOn":"2016-04-25T08:19:59.361Z",
                        "gameTemplate":{
                            "_id":"Shanghai",
                            "__v":0,
                            "id":"Shanghai"
                        },
                        "__v":0,
                        "players":[
                            {
                                "_id":"j.vanderschoot1@student.avans.nl",
                                "name":"Jelmer van der Schoot",
                                "__v":0
                            }
                        ],
                        "maxPlayers":32,
                        "minPlayers":2,
                        "state":"open",
                        "id":"571dd32f3d3c3311009985ef"
                    },
                    {
                        "_id":"571dd3263d3c33110099855e",
                        "createdBy":{
                            "_id":"j.vanderschoot1@student.avans.nl",
                            "name":"Jelmer van der Schoot",
                            "__v":0
                        },
                        "createdOn":"2016-04-25T08:19:50.705Z",
                        "gameTemplate":{
                            "_id":"Shanghai",
                            "__v":0,
                            "id":"Shanghai"
                        },
                        "__v":0,
                        "players":[
                            {
                                "_id":"j.vanderschoot1@student.avans.nl",
                                "name":"Jelmer van der Schoot",
                                "__v":0
                            }
                        ],
                        "maxPlayers":30,
                        "minPlayers":3,
                        "state":"open",
                        "id":"571dd3263d3c33110099855e"
                    },
                    {
                        "_id":"571dd3113d3c3311009984cd",
                        "createdBy":{
                            "_id":"j.vanderschoot1@student.avans.nl",
                            "name":"Jelmer van der Schoot",
                            "__v":0
                        },
                        "createdOn":"2016-04-25T08:19:29.338Z",
                        "gameTemplate":{
                            "_id":"Dragon",
                            "__v":0,
                            "id":"Dragon"
                        },
                        "__v":0,
                        "players":[
                            {
                                "_id":"j.vanderschoot1@student.avans.nl",
                                "name":"Jelmer van der Schoot",
                                "__v":0
                            }
                        ],
                        "maxPlayers":32,
                        "minPlayers":2,
                        "state":"open",
                        "id":"571dd3113d3c3311009984cd"
                    },
                    {
                        "_id":"571dd15b3d3c33110099843c",
                        "createdBy":{
                            "_id":"j.vanderschoot1@student.avans.nl",
                            "name":"Jelmer van der Schoot",
                            "__v":0
                        },
                        "createdOn":"2016-04-25T08:12:11.337Z",
                        "gameTemplate":{
                            "_id":"Ox",
                            "__v":0,
                            "id":"Ox"
                        },
                        "__v":0,
                        "startedOn":"2016-04-25T08:12:14.858Z",
                        "players":[
                            {
                                "_id":"j.vanderschoot1@student.avans.nl",
                                "name":"Jelmer van der Schoot",
                                "__v":0
                            }
                        ],
                        "maxPlayers":32,
                        "minPlayers":1,
                        "state":"playing",
                        "id":"571dd15b3d3c33110099843c"
                    },
                    {
                        "_id":"571dcf973d3c3311009983ab",
                        "createdBy":{
                            "_id":"j.vanderschoot1@student.avans.nl",
                            "name":"Jelmer van der Schoot",
                            "__v":0
                        },
                        "createdOn":"2016-04-25T08:04:39.592Z",
                        "gameTemplate":{
                            "_id":"Shanghai",
                            "__v":0,
                            "id":"Shanghai"
                        },
                        "__v":0,
                        "players":[
                            {
                                "_id":"j.vanderschoot1@student.avans.nl",
                                "name":"Jelmer van der Schoot",
                                "__v":0
                            }
                        ],
                        "maxPlayers":32,
                        "minPlayers":2,
                        "state":"open",
                        "id":"571dcf973d3c3311009983ab"
                    },
                    {
                        "_id":"571dcd263d3c33110099831a",
                        "createdBy":{
                            "_id":"cjg.vanheumen@student.avans.nl",
                            "name":"Stan van Heumen",
                            "__v":0
                        },
                        "createdOn":"2016-04-25T07:54:14.817Z",
                        "gameTemplate":{
                            "_id":"Ox",
                            "__v":0,
                            "id":"Ox"
                        },
                        "__v":0,
                        "players":[
                            {
                                "_id":"cjg.vanheumen@student.avans.nl",
                                "name":"Stan van Heumen",
                                "__v":0
                            }
                        ],
                        "maxPlayers":32,
                        "minPlayers":2,
                        "state":"open",
                        "id":"571dcd263d3c33110099831a"
                    }
                ];
                return games;
        },
        PUT: function(game){
            //stub
        },
        POST: function(game){
            //stub
        },
        DELETE: function(game){
            //fake

        }
    };
    //
    //factory.addGame = function(templateName, minPlayers, maxPlayers){
    //    var game = {
    //        "templateName": templateName,
    //        "minPlayers" : minPlayers,
    //        "maxPlayers" : maxPlayers,
    //        "players" : [UserFactory.user]
    //    };
    //    factory.games.push(game);
    //};
    //
    //factory.joinGame = function(game){
    //    if((game.state != 'finished') && (game.maxPlayers < game.players.length)){
    //        game.players.push(UserFactory.user);
    //    }
    //};
    //
    //return factory;
};