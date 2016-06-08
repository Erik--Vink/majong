var socketModule = angular.module('app.socket', []);

var socketService = require("./socket.service");

socketModule.service("SocketService", socketService);

module.exports = socketModule;
