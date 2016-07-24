/**
 * Created by jeyrschabu on 6/20/16.
 */

describe('Home', function(){
    var scope,
        homeController;

    beforeEach(module('Rigs'));
    beforeEach(module('rigs.home'));

    describe('HomeController', function() {

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            homeController = $controller('HomeController', { '$scope' : scope });
        }));

        it ('should have a title to match the page', function() {
            expect(homeController.pageTitle).toBe('Home');
            expect(scope.bodyClass).toBe(homeController.pageTitle.toLocaleLowerCase());
        });
    })
});
