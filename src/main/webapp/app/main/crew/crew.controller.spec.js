/**
 * Created by jeyrschabu on 6/20/16.
 */

describe('Crew', function() {
    var scope,
        crewController;

    beforeEach(module('Rigs'));

    describe('CrewController', function() {

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            crewController = $controller('CrewController', { '$scope' : scope });
        }));

        it ('should have a title to match the page', function() {
            expect(crewController.pageTitle).toBe('Crew');
            expect(scope.bodyClass).toBe(crewController.pageTitle.toLocaleLowerCase());
        });
    })
});