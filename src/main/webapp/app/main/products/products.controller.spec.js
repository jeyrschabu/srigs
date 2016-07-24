/**
 * Created by jeyrschabu on 6/20/16.
 */

describe('Products', function() {
    var scope,
        productController,
        mockProductService;

    beforeEach(module('Rigs'));

    describe('ProductController', function() {
        beforeEach(inject(function($rootScope, $controller, $q, ProductService) {
            scope = $rootScope.$new();
            mockProductService = ProductService;

            productController = $controller('ProductController', {
                '$scope' : scope,
                'ProductService' : mockProductService
            });

            spyOn(mockProductService, 'list').and.callFake(function() {
                return {
                    then: function(callback) { return callback({}); }
                };
            });

            spyOn(mockProductService, 'listByCategory').and.callFake(function() {
                return {
                    then: function(callback) { return callback({}); }
                };
            });

            spyOn(mockProductService, 'findById').and.callFake(function() {
                return {
                    then: function(callback) { return callback({}); }
                };
            });
        }));

        it ('should return a empty product list', function(){
            expect(productController.products.length).toBe(0);
        });

        it ('should return a list of products when getProducts is called', function() {
            productController.getProducts(undefined, undefined);
            expect(mockProductService.list).toHaveBeenCalled();

            productController.getProducts('gaming', undefined);
            expect(mockProductService.listByCategory).toHaveBeenCalled();
        });
    })
});

