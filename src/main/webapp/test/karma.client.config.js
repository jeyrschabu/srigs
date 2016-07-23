module.exports = function (karma) {
  karma.set({

    // base path, that will be used to resolve files and exclude
    basePath: './../webapp',

    // frameworks to use
    frameworks: ['jasmine'],

    files: [
        './../../webapp/bower_components/angular/angular.js',
        './../../webapp/bower_components/angular-mocks/angular-mocks.js',
        './../../webapp/bower_components/angular-route/angular-route.js',
        './../../webapp/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './../../webapp/bower_components/angular-animate/angular-animate.js',
        './../../webapp/bower_components/angular-sanitize/angular-sanitize.js',
        './../../webapp/bower_components/ng-lodash/build/ng-lodash.min.js',
        './../../webapp/bower_components/jquery/dist/jquery.min.js',

        './../../webapp/bower_components/tether/dist/js/tether.min.js',
        './../../webapp/bower_components/bootstrap/dist/js/bootstrap.min.js',
        './../../webapp/bower_components/ngSticky/lib/sticky.js',
        './../../webapp/bower_components/ngGallery/src/js/ngGallery.js',
        './../../webapp/app/**/*.module.js',
        './../../webapp/app/**/*.js',

        /******* Test Fixtures ******************/
      {
        pattern: './../test/fixtures/*.html',
        watched: false,
        served: true,
        included: false
      },

        /******* Jasmine Tests ******************/
      './../app/**/*.spec.js'
    ],

    preprocessors: {
      // define which files to include in coverage reports
      './../../main/webapp/app/**/**/*.js': ['coverage']
    },    

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // list of files to exclude
    exclude: [
    ],

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress', 'coverage'],

    // web server port
    // CLI --port 9876
    port: 9876,

    // cli runner port
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
    logLevel: karma.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    browsers: ['chrome_without_security'],

    customLaunchers: {
        chrome_without_security: {
            base: 'Chrome',
            flags: ['--disable-web-security']
        }
    },
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
