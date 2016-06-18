'use strict';

var CustomizeController = function($scope, $state, $rootScope, $stateParams, lodash, productService, specService) {
    var self = this;

    $scope.disableSticking = false;
    $scope.pageTitle = 'Customize';
    $rootScope.bodyClass = $scope.pageTitle.toLocaleLowerCase();
    $scope.productId = $stateParams.productId;
    $scope.selectedMark = $stateParams.mark;
    $scope.brand = $stateParams.brand;

    /** all parts to build a rig more coming soon **/
    $scope.product = {};
    $scope.rig = {};
    $scope.cases = [];
    $scope.cpuCooling = [];
    $scope.cables = [];
    $scope.specs = [];

    CustomizeController.prototype.setProduct = function (response) {
        $scope.product = response.data;
        self.initializeRig($scope.product);
    };

    CustomizeController.prototype.setSpecs = function (response) {
        $scope.specs = response.data;
    };

    CustomizeController.prototype.getProduct = function(productId) {
        if (productId) {
            productService.findById(productId).then(self.setProduct);
        }
    };

    CustomizeController.prototype.getSpecs = function() {
        specService.list().then(self.setSpecs);
    };

    CustomizeController.prototype.initializeRig = function(product) {
        var specs = product.specs;
        var totalPrice = product.price;
        if ($scope.selectedMark) {

            var matchedMark = ($scope.brand) ?
                lodash.filter(product.marks, { 'name' : $scope.selectedMark, 'brand' : $scope.brand }):
                    lodash.filter(product.marks, { 'name' : $scope.selectedMark });

            if (matchedMark && matchedMark.length) {
                specs = matchedMark[0].specs;
                totalPrice = matchedMark[0].price;
            }
        }

        $scope.cases        = lodash.filter(specs, { 'type' : 'Case' });
        $scope.cpuCooling   = lodash.filter(specs, { 'type' : 'CPU Cooler' });
        $scope.cables       = lodash.filter(specs, { 'type' : 'Cable' });

        $scope.rig = {
            product : product,
            totalPrice : totalPrice
        };
    };

    self.getProduct($scope.productId);
    self.getSpecs();

};

CustomizeController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'lodash', 'productService', 'specService'];
angular.module('Customize').controller('CustomizeController', CustomizeController);
