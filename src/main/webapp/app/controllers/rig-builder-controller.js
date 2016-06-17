'use strict';

var RigBuilderController = function($scope, $state, $rootScope, $stateParams, lodash, productService, specService) {
    var self = this;

    $scope.disableSticking = false;
    $scope.pageTitle = 'Customize';
    $rootScope.bodyClass = $scope.pageTitle.toLocaleLowerCase();
    $scope.productId = $stateParams.productId;

    /** all parts to build a rig more coming soon **/
    $scope.product = {};
    $scope.rig = {};
    $scope.cases = [];
    $scope.cpuCooling = [];
    $scope.cables = [];
    $scope.specs = [];

    RigBuilderController.prototype.setProduct = function (response) {
        $scope.product = response.data;
        self.initializeRig($scope.product);
    };

    RigBuilderController.prototype.setSpecs = function (response) {
        $scope.specs = response.data;
    };

    RigBuilderController.prototype.getProduct = function(productId) {
        productService.findById(productId).then(self.setProduct);
    };

    RigBuilderController.prototype.getSpecs = function() {
        specService.list().then(self.setSpecs);
    };

    RigBuilderController.prototype.initializeRig = function(product) {
        $scope.cases        = lodash.filter($scope.product.specs, { 'type' : 'Case' });
        $scope.cpuCooling   = lodash.filter($scope.product.specs, { 'type' : 'CPU Cooler' });
        $scope.cables       = lodash.filter($scope.product.specs, { 'type' : 'Cable' });

        $scope.rig = {
            product : product,
            totalPrice : 0
        };
    };

    self.getProduct($scope.productId);
    self.getSpecs();

};

RigBuilderController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'lodash', 'productService', 'specService'];
angular.module('MainApp').controller('RigBuilderController', RigBuilderController);
