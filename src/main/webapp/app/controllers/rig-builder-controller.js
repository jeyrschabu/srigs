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
    $scope.caseCooling = [];
    $scope.cables = [];

    RigBuilderController.prototype.setProduct = function (response) {
        $scope.product = response.data;
        self.initializeRig($scope.product);
    };

    RigBuilderController.prototype.setSpecs = function (response) {
        var specs = response.data;
        //TODO: revisit this

        $scope.cases        = lodash.find(specs, { 'type' : 'Cases' }); //TODO check type
        $scope.caseCooling  = lodash.find(specs, { 'type' : 'Case Cooling' }); //TODO check type
        $scope.cables       = lodash.find(specs, { 'type' : 'Cable' }); //TODO check type

        self.initializeRig($scope.product);
    };

    RigBuilderController.prototype.getProduct = function(productId) {
        productService.findById(productId).then(self.setProduct);
    };

    RigBuilderController.prototype.getSpecs = function() {
        specService.list().then(self.setSpecs);
    };

    RigBuilderController.prototype.initializeRig = function(product) {
        $scope.rig = {
            product : product,
            totalPrice : 0
        };
    };

    self.getProduct($scope.productId);

};

RigBuilderController.$inject = ['$scope', '$state', '$rootScope', '$stateParams', 'lodash', 'productService', 'specService'];
angular.module('MainApp').controller('RigBuilderController', RigBuilderController);
