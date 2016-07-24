/**
 * Created by jeyrschabu on 7/24/16.
 */

describe('Product Detail', function() {
    var scope,
        productDetailController,
        mockProductService;

    beforeEach(module('Rigs'));

    describe('ProductDetailController', function() {
        beforeEach(inject(function($rootScope, $controller, $q, ProductService) {
            scope = $rootScope.$new();
            mockProductService = ProductService;

            productDetailController = $controller('ProductDetailController', {
                '$scope' : scope,
                'ProductService' : mockProductService
            });

            spyOn(mockProductService, 'findById').and.callFake(function() {
                return {
                    then: function(callback) { return callback( {data: { name: 'product name'} }); }
                };
            });
        }));

        it ('should fetch a product by id', function() {
            productDetailController.getProduct('id');
            expect(mockProductService.findById).toHaveBeenCalled();
        });
    })
});
