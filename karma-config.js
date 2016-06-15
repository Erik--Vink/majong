/*var es6ify = require('es6ify');
 var brfs = require('brfs');*/
var istanbul = require('browserify-istanbul');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],
        files: [
            'app/**/*.js',
            // Angular-mocks moet na app.js geladen worden omdat daar angular in zit
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/underscore/underscore-min.js',
            'http://mahjongmayhem.herokuapp.com/socket.io/socket.io.js',
            'app/partials/*.html',
            'test/*.spec.js'
        ],

        reporters: ['progress', 'coverage'],

        preprocessors: {
            'app/**/*.js': ['coverage', 'browserify'],
            'app/partials/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: 'app/'
        },

        browserify: {
            debug: true,
            transform: [/*es6ify, brfs, 'browserify-shim',*/ istanbul({
                ignore: ['**/node_modules/**', '**/test/**']
            })]
        },

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },

        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        browsers: ['Chrome']

    });
};