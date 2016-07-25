'use strict';

CustomizeController.$inject = ['$rootScope', '$stateParams', 'lodash', 'ProductService'];

function CustomizeController($rootScope, $stateParams, lodash, ProductService) {
    var customizeController = this;

    customizeController.disableSticking = false;
    customizeController.pageTitle = 'Customize';
    
    $rootScope.bodyClass = customizeController.pageTitle.toLocaleLowerCase();
    customizeController.productId = $stateParams.productId;
    customizeController.selectedMark = $stateParams.mark;
    customizeController.brand = $stateParams.brand;

    /** all parts to build a rig more coming soon **/
    customizeController.product = {};
    customizeController.rig = {};

    customizeController.cases = [];
    customizeController.caseFans = [];
    customizeController.cables = [];
    customizeController.specs = [];

    customizeController.finishedWizard = finishedWizard;


    function finishedWizard() {

    }

    function Rig(options) {
        return {
            product:        options.product,
            totalPrice:     options.totalPrice,
            selectedCase:   options.selectedCase
        }
    }

    function initializeRigBuilder(response) {
        customizeController.product = response.data;
        var marks = lodash.filter(customizeController.product.marks, {
            'name': customizeController.selectedMark || 'Mark 1',
            'brand': customizeController.brand || 'Intel'
        });

        var specs = marks[0].specs;
        var totalPrice = marks[0].price;

        customizeController.cases        = lodash.filter(specs, { 'type' : 'Case' });
        customizeController.caseFans     = lodash.filter(specs, { 'type' : 'Case Fans' });
        customizeController.cables       = lodash.filter(specs, { 'type' : 'Cable' });

        customizeController.rig = new Rig({
            product : customizeController.product,
            totalPrice : totalPrice
        });
    }

    function initialize(productId) {
        if (productId) {
            ProductService.findById(productId).then(initializeRigBuilder);
        }
    }

    initialize(customizeController.productId);
}



