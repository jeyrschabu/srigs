/**
 * Created by jeyrschabu on 6/20/16.
 */

describe('Common', function() {
    var scope,
        location,
        commonController;

    beforeEach(module('Rigs'));

    describe('CommonController', function() {

        beforeEach(inject(function($rootScope, $controller, $location) {
            scope = $rootScope.$new();
            location = $location;
            commonController = $controller('CommonController', {
                '$scope': scope,
                '$location': location
            });
        }));

        it ('should determine active tab based on current path', function() {
            expect(commonController.currentTab('/home')).toBe(false);
            location.path('/home');
            expect(commonController.currentTab('/home')).toBe(true);
        });

    })
});
