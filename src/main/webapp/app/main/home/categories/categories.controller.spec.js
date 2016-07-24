/**
 * Created by jeyrschabu on 7/24/16.
 */

describe('Categories Controller', function(){
    var scope,
        categoryController,
        mockCategoryService;

    beforeEach(module('rigs.categories'));
    
    beforeEach (function () {
        module(function($provide) {
            $provide.constant('API_PREFIX', '/api/v1');
        });
    });

    describe('CategoryController', function() {

        beforeEach(inject(function($rootScope, $controller, CategoryService) {
            scope = $rootScope.$new();
            mockCategoryService = CategoryService;

            categoryController = $controller('CategoryController', {
                '$scope' : scope,
                'CategoryService' : mockCategoryService
            });

            spyOn(mockCategoryService, 'list').and.callFake(function() {
                return {
                    then: function(callback) { return callback({}); }
                };
            });
        }));

        it ('should get a list of categories', function() {
            categoryController.getCategories();
            expect(mockCategoryService.list).toHaveBeenCalled();
        });
    })
});
