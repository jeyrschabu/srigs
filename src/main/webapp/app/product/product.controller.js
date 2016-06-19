'use strict';

var ProductController = function($scope, $state, $rootScope, $stateParams, categoryService, productService) {
    var self = this;

    $scope.pageTitle = 'Products';
    $rootScope.bodyClass = $scope.pageTitle.toLocaleLowerCase();

    $scope.byGlance = byGlance;

    $scope.disableSticking = false;
    $scope.categories = [];
    $scope.category = $stateParams.category;
    $scope.productId = $stateParams.productId;
    $scope.product = {};

    const MAIN_SPECS_TYPE = ['CPU', 'RAM' , 'GPU'];

    $scope.products = [];

    function byGlance(spec) {
        return MAIN_SPECS_TYPE.indexOf(spec.type) > -1 ;
    }

    ProductController.prototype.setProducts = function (response) {
        $scope.products = response.data;
    };

    ProductController.prototype.setProduct = function (response) {
        $scope.product = response.data;
    };

    ProductController.prototype.setCategories = function (categories) {
        $scope.categories = categories.data;
    };

    ProductController.prototype.getProducts = function(category, productId) {
        if (productId) {
            $rootScope.bodyClass = $scope.product.name;
            productService.findById(productId).then(self.setProduct);

        } else if (category) {
            $rootScope.bodyClass = category;
            productService.listByCategory(category).then(self.setProducts);

        } else {
            productService.list().then(self.setProducts);
        }
    };

    ProductController.prototype.getCategories = function() {
        categoryService.list().then(self.setCategories);
    };

    self.getProducts($scope.category, $scope.productId);
    self.getCategories();

};

ProductController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'categoryService', 'productService'];
angular.module('Product').controller('ProductController', ProductController);
