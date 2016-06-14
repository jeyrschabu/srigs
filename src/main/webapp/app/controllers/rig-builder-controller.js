'use strict';

var RigBuilderController = function($scope, $state, $rootScope, $stateParams, productService) {
    var self = this;

    $scope.disableSticking = false;
    $scope.pageTitle = 'Customize';
    $scope.productId = $stateParams.productId;

    /** all parts to build a rig more coming soon **/
    $scope.product = {};
    $scope.rig = {};
    $scope.cases = [];
    $scope.caseCooling = [];
    $scope.cables = [];

    RigBuilderController.prototype.setProduct = function (product) {
        $scope.product = product.data;
        self.initializeRig($scope.product);
    };

    RigBuilderController.prototype.getProduct = function(productId) {
        productService.findById(productId).then(self.setProduct);
    };

    RigBuilderController.prototype.initializeRig = function(product) {
        $scope.rig = {
            product : product,
            totalPrice : 0
        };
    };

    self.getProduct($scope.productId);

};

RigBuilderController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'productService'];
angular.module('MainApp').controller('RigBuilderController', RigBuilderController);
