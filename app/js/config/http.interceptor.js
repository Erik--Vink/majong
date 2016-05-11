module.exports = function (AuthFactory) {
    return {
        request: function (config) {

            config.headers['x-token'] = AuthFactory.getToken();
            config.headers['x-username'] = 'application/json;odata=verbose';

            return config;
        }
    };
};
