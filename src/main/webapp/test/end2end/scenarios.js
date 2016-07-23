'use strict';

describe('MainApp End 2 End', function() {

    var path = require('path');

    beforeEach(function () {
        browser.get('/');
        browser.waitForAngular();
    });

    it('should redirect you to homepage', function () {
        browser.get('/#/home');
    });
});

