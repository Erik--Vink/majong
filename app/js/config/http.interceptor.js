module.exports = function ($injector) {
    return {
        request: function (config) {

            var AuthFactory = $injector.get('AuthFactory');

            config.headers['x-token'] = AuthFactory.getToken();
            config.headers['x-username'] = AuthFactory.getUsername();

            return config;
        }
    };
};
