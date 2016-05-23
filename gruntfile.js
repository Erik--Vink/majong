var rewrite = require('connect-modrewrite');

module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            js: {
                src: 'app/js/app.js',
                dest: 'dist/js/app.js',
                options: {
                    external: ['angular'],
                    debug: true,
                    browserifyOptions: { debug: true }
                }
            }
        },
        copy: {
            all: {
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', '**/*.css'],
                dest: 'dist/'
            }
        },
        watch: {
            js: {
                files: "app/**/*.js",
                tasks: "browserify"
            },
            html: {
                files: 'app/**/*.html',
                tasks: 'copy'
            },
            css: {
                files: 'app/**/*.scss',
                tasks: 'sass'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/css/app.css' : 'app/css/app.scss'
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 3001,
                    base: './dist',
                    open : true,
                    livereload: true,
                    middleware: function(connect, options, middlewares) {
                        var rules = [
                            '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                        ];
                        middlewares.unshift(rewrite(rules));
                        return middlewares;
                    }
                }
            }
        }

    });

    // Load the npm installed tasks
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks('grunt-contrib-sass');

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['browserify', 'copy', 'sass', "connect:server", 'watch']);
};