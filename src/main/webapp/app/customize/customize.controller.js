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
    $scope.caseFans = [];
    $scope.cables = [];
    $scope.specs = [];

    CustomizeController.prototype.setRig = function (response) {
        $scope.product = response.data;
        var specs = $scope.product.specs;
        var totalPrice = $scope.product.price;
        if ($scope.selectedMark) {

            var matchedMark = ($scope.brand) ?
                lodash.filter($scope.product.marks, { 'name' : $scope.selectedMark, 'brand' : $scope.brand }):
                lodash.filter($scope.product.marks, { 'name' : $scope.selectedMark });

            if (matchedMark && matchedMark.length) {
                specs = matchedMark[0].specs;
                totalPrice = matchedMark[0].price;
            }
        }

        $scope.cases        = lodash.filter(specs, { 'type' : 'Case' });
        $scope.caseFans     = lodash.filter(specs, { 'type' : 'Case Fans' });
        $scope.cables       = lodash.filter(specs, { 'type' : 'Cable' });

        $scope.rig = {
            product : $scope.product,
            totalPrice : totalPrice
        };
    };

    CustomizeController.prototype.setSpecs = function (response) {
        $scope.specs = response.data;
    };

    CustomizeController.prototype.getProduct = function(productId) {
        if (productId) {
            productService.findById(productId).then(self.setRig);
        }
    };

    CustomizeController.prototype.getSpecs = function() {
        specService.list().then(self.setSpecs);
    };

    self.getProduct($scope.productId);
    self.getSpecs();

};

CustomizeController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'lodash', 'productService', 'specService'];
angular.module('Customize').controller('CustomizeController', CustomizeController);
