
describe('MainApp', function(){
    var scope;
    var supportController;

    beforeEach(function () {
        module('MainApp');
    });

    describe('SupportController', function(){
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
