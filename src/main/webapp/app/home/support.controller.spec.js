/**
 * Created by jeyrschabu on 6/20/16.
 */

describe('Home', function() {
    var scope;
    var supportController;

    beforeEach(function () {
        module('Home');
    });

    describe('SupportController', function() {
        beforeEach(inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            supportController = $controller('SupportController', {
                '$scope' : scope
            });
        }));

        it('should have a title to match the page', function(){
            expect(scope.pageTitle).toBe('Support');
        });
    })
});