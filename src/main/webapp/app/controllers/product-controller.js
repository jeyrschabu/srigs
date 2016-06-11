'use strict';

var ProductController = function($scope, $rootScope, $stateParams, categoryService, productService, featureService) {
    var self = this;

    $scope.disableSticking = false;

    $rootScope.bodyClass = 'product-page';

    $scope.pageTitle = 'Products';
    $scope.categories = [];
    $scope.features = [];
    $scope.category = $stateParams.category;

    $scope.products = [];

    ProductController.prototype.setProducts = function (products) {
        $scope.products = products.data;
    };

    ProductController.prototype.setCategories = function (categories) {
        $scope.categories = categories.data;
    };

    ProductController.prototype.setFeatures = function (features) {
        $scope.features = features.data;
    };

    ProductController.prototype.getProducts = function(category) {
        if (!category) {
            productService.list().then(self.setProducts);
        }  else {
            productService.listByCategory(category).then(self.setProducts);
        }
    };

    ProductController.prototype.getCategories = function() {
        categoryService.list().then(self.setCategories);
    };

    ProductController.prototype.getFeatures = function() {
        featureService.list().then(self.setFeatures);
    };

    self.getProducts($scope.category);
    self.getCategories();

};

ProductController.$inject = ['$scope', '$stateParams', 'categoryService', 'productService' ,'featureService'];
angular.module('MainApp').controller('ProductController', ProductController);
