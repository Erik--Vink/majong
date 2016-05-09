module.exports = function($window, $state){
    var auth = {};

    auth.getToken = function(){
        return $window.localStorage['x-token'];
    };

    auth.getUsername = function(){
        if(auth.isLoggedIn()){
            return $window.localStorage['x-username'];
        }
    };

    auth.isLoggedIn = function(){
        return $window.localStorage['x-token'] != null;
    };

    auth.logIn = function(user){
        $window.localStorage['x-token'] = user.token;
        $window.localStorage['x-username'] = user.username;
    };

    auth.logOut = function(){
        $window.localStorage.removeItem('x-token');
        $window.localStorage.removeItem('x-username');
    };

    return auth;
};