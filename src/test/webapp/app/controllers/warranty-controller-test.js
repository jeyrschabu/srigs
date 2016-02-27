
describe('MainApp', function(){
    var scope;
    var warrantyController;

    beforeEach(function () {
        module('MainApp');
    });

    describe('WarrantyController', function(){
        beforeEach(inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            warrantyController = $controller('WarrantyController', {
                '$scope' : scope
            });
        }));

        it('should have a title to match the page', function(){
            expect(scope.pageTitle).toBe('Warranty');
        });
    })
});
