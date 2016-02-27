/*jshint browser: true, jasmine: true */
'use strict';

exports.config = {
  allScriptsTimeout: 10000,
  specs: [ 'src/test/webapp/end2end/scenarios.js' ],

  capabilities: {
    'command-timeout': '1000',
    'browserName': 'phantomjs',
    'phantomjs.binary.path': 'node_modules/phantomjs/bin/phantomjs',
    'phantomjs.cli.args': [ '--ignore-ssl-errors=true', '--web-security=false' ]
  },

  rootElement: 'html',
  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: false,
    defaultTimeoutInterval: 30000,
    includeStackTrace: true
  },

  onPrepare: function () {
    browser.driver.manage()
      .window()
      .maximize();

    require( 'jasmine-reporters' );
    jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter( 'xmloutput', true, true ));
  }
};
