describe('MainApp', function(){
    var scope;
    var contactController;

    beforeEach(function () {
        module('MainApp');
    });

    describe('ContactController', function(){
        beforeEach(inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            contactController = $controller('ContactController', {
                '$scope' : scope
            });
        }));

        it('should have a title to match the page', function(){
            expect(scope.pageTitle).toBe('Contact');
        });
    })
});
