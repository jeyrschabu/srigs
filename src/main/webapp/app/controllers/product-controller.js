'use strict';

var ProductController = function($scope, $state, $rootScope, $stateParams, categoryService, productService) {
    var self = this;

    $scope.byGlance = byGlance;
    $scope.details = details;
    $scope.disableSticking = false;

    $rootScope.bodyClass = 'products';

    $scope.pageTitle = 'Products';
    $scope.categories = [];
    $scope.features = [];
    $scope.category = $stateParams.category;
    $scope.productId = $stateParams.productId;

    const MAIN_SPECS_TYPE = ['CPU', 'RAM' , 'GPU'];
    const DETAIL_ROUTE = 'product-detail';

    $scope.products = [];

    function byGlance(spec) {
        return MAIN_SPECS_TYPE.indexOf(spec.type) > -1 ;
    }

    function details(product, category, $event) {
        $event.preventDefault();
        $state.go(DETAIL_ROUTE, {
            category: category,
            productId: product.id
        } );
    }

    ProductController.prototype.setProducts = function (products) {
        $scope.products = products.data;
        if ($scope.productId) {
            $scope.products = $scope.products.filter(function(product) {
                return product.id === $scope.productId;
            });

            //temp url construction for single product detail page
            $scope.products = $scope.products.map(function(product) {
                product.url =  'app/partials/products/'+ product.name.toLowerCase() + '.html';
                return product;
            });

            $rootScope.bodyClass = $scope.products[0].name;
        }
    };

    ProductController.prototype.setCategories = function (categories) {
        $scope.categories = categories.data;
    };

    ProductController.prototype.getProducts = function(category) {
        if (!category) {
            productService.list().then(self.setProducts);
        }  else {
            $rootScope.bodyClass = category;
            productService.listByCategory(category).then(self.setProducts);
        }
    };

    ProductController.prototype.getCategories = function() {
        categoryService.list().then(self.setCategories);
    };

    self.getProducts($scope.category);
    self.getCategories();

};

ProductController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'categoryService', 'productService'];
angular.module('MainApp').controller('ProductController', ProductController);
