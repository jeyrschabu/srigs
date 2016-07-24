/**
 * Created by jeyrschabu on 6/20/16.
 */

describe('Support', function(){
    var scope,
        supportController;

    beforeEach(module('Rigs'));

    describe('SupportController', function() {

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            supportController = $controller('SupportController', { '$scope' : scope });
        }));

        it ('should have a title to match the page', function() {
            expect(supportController.pageTitle).toBe('Support');
            expect(scope.bodyClass).toBe(supportController.pageTitle.toLocaleLowerCase());
        });
    })
});