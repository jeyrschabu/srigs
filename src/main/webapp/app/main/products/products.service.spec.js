/**
 * Created by jeyrschabu on 6/20/16.
 */

describe('Product Service', function () {

    var productService;
    var httpBackend = {};


    beforeEach(module('Rigs'));

    describe ('ProductService', function () {
        beforeEach (inject(function (ProductService, $httpBackend) {
            productService = ProductService;
            httpBackend = $httpBackend;
        }));

        it ('should return a list of products', function() {
            var products = [{name : 'test-product1'}];

            httpBackend.whenGET('/api/v1/products').respond({
                products : products
            });
            productService.list().then(function(response) {
                expect(response.data.products).toEqual(products);
            });
            httpBackend.flush();
        });

        it ('should return a list of products based by category', function() {
            var category = 'gaming desktops';
            var products = [{
                name : 'test-product1', category: category
            }];

            httpBackend.whenGET('/api/v1/products/categories/'+category).respond({
                products : products
            });
            productService.listByCategory(category).then(function(response) {
                expect(response.data.products).toEqual(products);
            });

            httpBackend.flush();
        });

        it ('should return a single product by id', function() {
            var id = 'id';
            var product = { id : id };

            httpBackend.whenGET('/api/v1/products/'+id).respond(product);

            productService.findById(id).then(function(response) {
                expect(response.data).toEqual(product);
            });

            httpBackend.flush();
        });

        afterEach (function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
});

