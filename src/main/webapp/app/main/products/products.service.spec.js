// /**
//  * Created by jeyrschabu on 6/20/16.
//  */
//
// describe('Product', function () {
//
//     var productService;
//     var httpBackend = {};
//
//
//     beforeEach(function () {
//         module('Product');
//     });
//
//     describe ('productService', function () {
//         beforeEach (inject(function (_productService_, $httpBackend) {
//             productService = _productService_;
//             httpBackend = $httpBackend;
//         }));
//
//         it ('should return a list of products', function() {
//             var products = [{name : 'test-product1'}];
//
//             httpBackend.whenGET('/v1/products').respond({
//                 products : products
//             });
//             productService.list().then(function(response) {
//                 expect(response.data.products).toEqual(products);
//             });
//             httpBackend.flush();
//         });
//
//         it ('should return a list of products based by category', function() {
//             var category = 'gaming desktops';
//             var products = [{
//                 name : 'test-product1', category: category
//             }];
//
//             httpBackend.whenGET('/v1/products/categories/'+category).respond({
//                 products : products
//             });
//             productService.listByCategory(category).then(function(response) {
//                 expect(response.data.products).toEqual(products);
//             });
//
//             httpBackend.flush();
//         });
//
//         it ('should return a single product by id', function() {
//             var id = 'id';
//             var product = { id : id };
//
//             httpBackend.whenGET('/v1/products/'+id).respond(product);
//
//             productService.findById(id).then(function(response) {
//                 expect(response.data).toEqual(product);
//             });
//
//             httpBackend.flush();
//         });
//
//         afterEach (function() {
//             httpBackend.verifyNoOutstandingExpectation();
//             httpBackend.verifyNoOutstandingRequest();
//         });
//     });
// });
//
