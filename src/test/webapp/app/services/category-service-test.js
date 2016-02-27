describe('MainApp', function () {

    var categoryService;
    var httpBackend = {};


    beforeEach(function () {
        module('MainApp');
    });

    describe ('categoryService', function () {
        beforeEach (inject(function (_categoryService_, $httpBackend) {
            categoryService = _categoryService_;
            httpBackend = $httpBackend;
        }));

        it ('should return a list of categories', function() {
            var categories = [ {"name" : "Gaming Desktops" }];

            httpBackend.whenGET('/v1/categories').respond({
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
