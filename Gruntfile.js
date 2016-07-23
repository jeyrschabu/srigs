module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        project: {
            root: './src/main/webapp',
            public: '<%= project.root %>/public',
            app: '<%= project.root %>/app',
            scss: [
                '<%= project.public %>/scss/main.scss'
            ],
            js: [
                '<%= project.public %>/scripts/*.js',
                '<%= project.app %>/**/*.js'
            ]
        },
        karma: {
            unit: {
                configFile: './src/main/webapp/test/karma.client.config.js',
                plugins:[
                    'karma-jasmine',
                    'karma-coverage',
                    'karma-chrome-launcher',
                    'karma-firefox-launcher',
                    'karma-phantomjs-launcher'
                ]
            }
        },
        sass : {
            dev: {
                options: {
                    style: 'expanded',
                    compass: false,
                    sourcemap: 'none',
                },
                files: {
                    '<%= project.public %>/styles/main.css': '<%= project.scss %>'
                }
            },
            dist: {
                options: {
                    style: 'compressed',
                    compass: false,
                    sourcemap: 'none',
                },
                files: {
                    '<%= project.public %>/styles/main.css': '<%= project.scss %>'
                }
            }
        },
        watch: {
            sass: {
                files: '<%= project.public %>/scss/{,*/}*.{scss,sass}',
                tasks: ['sass:dev']
            }
        },
        concat: {
            dist: {
                src: [
                    '<%= project.public %>/scripts/*.js', // All public scripts
                    '<%= project.app %>/**/*.js'   // All the app scripts
                ],
                dest: '<%= project.public %>/build/production.js'
            }
        },
        uglify: {
            build: {
                src: '<%= project.public %>/build/production.js',
                dest: '<%= project.public %>/build/production.min.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                src: [
                    '<%= project.app %>/**/*.js'   // All the app scripts
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass:dist']);
    grunt.registerTask('test', ['jshint', 'karma']);
    //grunt.registerTask('build', ['sass:dev', 'karma']);
    //grunt.registerTask('pre-deploy', ['sass:dist', 'concat', 'uglify']);
    grunt.registerTask('build', ['sass:dist']);

};




