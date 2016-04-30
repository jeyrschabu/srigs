describe('MainApp', function(){
    var scope;
    var crewController;

    beforeEach(function () {
        module('MainApp');
    });

    describe('CrewController', function(){
        beforeEach(inject(function($rootScope, $controller){
            scope = $rootScope.$new();
            crewController = $controller('CrewController', {
                '$scope' : scope
            });
        }));

        it('should have a title to match the page', function(){
            expect(scope.pageTitle).toBe('Crew');
        });
    })
});
