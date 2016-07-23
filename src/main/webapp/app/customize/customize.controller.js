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

    function setRig(response) {
        customizeController.product = response.data;
        var specs = customizeController.product.specs;
        var totalPrice = customizeController.product.price;
        if (customizeController.selectedMark) {

            var matchedMark = (customizeController.brand) ?
                lodash.filter(customizeController.product.marks, { 'name' : customizeController.selectedMark, 'brand' : customizeController.brand }):
                lodash.filter(customizeController.product.marks, { 'name' : customizeController.selectedMark });

            if (matchedMark && matchedMark.length) {
                specs = matchedMark[0].specs;
                totalPrice = matchedMark[0].price;
            }
        }

        customizeController.cases        = lodash.filter(specs, { 'type' : 'Case' });
        customizeController.caseFans     = lodash.filter(specs, { 'type' : 'Case Fans' });
        customizeController.cables       = lodash.filter(specs, { 'type' : 'Cable' });

        customizeController.rig = {
            product : customizeController.product,
            totalPrice : totalPrice
        };
    }

    function getProduct(productId) {
        if (productId) {
            ProductService.findById(productId).then(setRig);
        }
    }

    getProduct(customizeController.productId);
}



