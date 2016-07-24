/**
 * Created by jeyrschabu on 6/20/16.
 */

describe('Categories', function () {

    var categoryService;
    var httpBackend = {};


    beforeEach(module('Rigs'));

    describe ('CategoryService', function () {

        beforeEach(inject(function (CategoryService, $httpBackend) {
            categoryService = CategoryService;
            httpBackend = $httpBackend;
        }));

        it ('should return a list of categories', function() {
            var categories = [ { 'name' : 'Gaming Desktops' }];

            httpBackend.whenGET('/api/v1/categories').respond({
                categories : categories
            });
            categoryService.list().then(function(response) {
                expect(response.data.categories).toEqual(categories);
            });

            httpBackend.flush();
        });

        afterEach (function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
});

