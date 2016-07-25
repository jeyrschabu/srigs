/**
 * Created by jeyrschabu on 7/24/16.
 */

describe('Customize', function() {
    var scope,
        customizeController;

    beforeEach(module('Rigs'));

    describe('CustomizeController', function() {

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            customizeController = $controller('CustomizeController', { '$scope' : scope });
        }));

        it ('should have a title to match the page', function() {
            expect(customizeController.pageTitle).toBe('Customize');
            expect(scope.bodyClass).toBe(customizeController.pageTitle.toLocaleLowerCase());
        });
    })
});
