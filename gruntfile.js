/**
 * Created by Nevernown on 18-4-2016.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default : {
                files: [{src: ["app/ts/app.ts"], dest: "dist/ts/app.js"}]
            }
        },
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
                // This copies all the html and css into the dist/ folder
                expand: true,
                cwd: 'app/',
                src: ['**/*.html', '**/*.css'],
                dest: 'dist/'
            }
        },
        watch: {
            js: {
                files: "app/js/**/*.js",
                tasks: "browserify"
            },
            ts: {
                files: "app/ts/**/*.ts",
                tasks: "ts"
            },
            html: {
                files: 'app/**/*.html',
                tasks: 'copy'
            },
            css: {
                files: 'app/**/*.css',
                tasks: 'copy'
            }
        },
        'http-server': {
            dev: {
                root: './dist',
                port: 3000,
                openBrowser : true,
                runInBackground: true
            }
        }
    });

    // Load the npm installed tasks
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['ts', 'browserify', 'copy', 'http-server', 'watch']);
};