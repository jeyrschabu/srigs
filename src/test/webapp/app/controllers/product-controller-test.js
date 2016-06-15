describe('MainApp', function(){
    var scope,
        productController,
        mockProductService;

    beforeEach(function () {
        module('MainApp');
    });

    describe('ProductController', function(){
        beforeEach(inject(function($rootScope, $controller, $q, productService) {
            scope = $rootScope.$new();
            mockProductService = productService;

            productController = $controller('ProductController', {
                '$scope' : scope,
                'productService' : mockProductService
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
            expect(scope.products.length).toBe(0);
        });

        it ('should return a list of products when getProducts is called', function() {
            productController.getProducts(undefined, undefined);
            expect(mockProductService.list).toHaveBeenCalled();

            productController.getProducts('gaming', undefined);
            expect(mockProductService.listByCategory).toHaveBeenCalled();

            productController.getProducts('gaming', 'id1');
            expect(mockProductService.findById).toHaveBeenCalled();
        });
    })
});
