'use strict';

var ProductController = function($scope, $rootScope, $stateParams, categoryService, productService) {
    var self = this;

    $scope.byGlance = byGlance;
    $scope.disableSticking = false;

    $rootScope.bodyClass = 'product-page';

    $scope.pageTitle = 'Products';
    $scope.categories = [];
    $scope.features = [];
    $scope.category = $stateParams.category;
    var glanceSpecTypes = ['CPU', 'RAM' , 'GPU'];

    $scope.products = [];

    function byGlance(spec) {
        return glanceSpecTypes.indexOf(spec.type) > -1 ;
    }


    ProductController.prototype.setProducts = function (products) {
        $scope.products = products.data;
    };

    ProductController.prototype.setCategories = function (categories) {
        $scope.categories = categories.data;
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

    self.getProducts($scope.category);
    self.getCategories();

};

ProductController.$inject = ['$scope', '$rootScope', '$stateParams', 'categoryService', 'productService'];
angular.module('MainApp').controller('ProductController', ProductController);
