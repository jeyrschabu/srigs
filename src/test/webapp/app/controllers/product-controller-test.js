describe('MainApp', function(){
    var scope,
        productController,
        mockProductService;

    beforeEach(function () {
        module('MainApp');
    });

    describe('ProductController', function(){
        beforeEach(inject(function($rootScope, $controller, $q, productService){
            scope = $rootScope.$new();
            mockProductService = productService;

            productController = $controller('ProductController', {
                '$scope' : scope,
                'productService' : mockProductService
            });

            spyOn(mockProductService, 'list').and.callFake(function(){
                return {
                    then: function(callback) { return callback({}); }
                };
            });
        }));

        it ('should return a empty product list', function(){
            expect(scope.products.length).toBe(0);
        });

        xit ('should return a list of products when getProducts is called', function() {
            productController.getProducts(undefined);
            expect(mockProductService.list).toHaveBeenCalled();
        });
    })
});
