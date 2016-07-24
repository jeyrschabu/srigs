'use strict';

ProductController.$inject = ['$rootScope', '$stateParams', 'ProductService'];

function ProductController($rootScope, $stateParams, ProductService) {
    var productController = this;

    productController.pageTitle = 'Products';
    $rootScope.bodyClass = productController.pageTitle.toLocaleLowerCase();

    productController.byGlance = byGlance;

    productController.disableSticking = false;
    productController.categories = [];
    productController.category = $stateParams.category;
    productController.productId = $stateParams.productId;
    productController.product = {};
    productController.products = [];
    productController.byGlance = byGlance;
    productController.getProducts = getProducts;

    const MAIN_SPECS_TYPE = ['CPU', 'RAM' , 'GPU'];

    function byGlance(spec) {
        return MAIN_SPECS_TYPE.indexOf(spec.type) > -1 ;
    }

    productController.sanitizeString = function(str) {
        return (str) ? str.replace(/\W/g, '').toLowerCase().trim() : '';
    };

    function getProducts(category) {
        if (category) {
            $rootScope.bodyClass = category;
            ProductService.listByCategory(category).then(function(response) {
                productController.products = response.data;
            });
        } else {
            ProductService.list().then(function(response) {
                productController.products = response.data;
            });
        }
    }

    getProducts(productController.category);
}
