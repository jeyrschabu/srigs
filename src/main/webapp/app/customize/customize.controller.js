'use strict';

CustomizeController.$inject = ['$rootScope', '$scope', '$stateParams', 'lodash', 'ProductService'];

function CustomizeController($rootScope, $scope, $stateParams, lodash, ProductService) {
    var customizeController = this;

    customizeController.disableSticking = false;
    customizeController.pageTitle = 'Customize';
    $rootScope.bodyClass = customizeController.pageTitle.toLocaleLowerCase();

    /** all parts to build a rig more coming soon **/
    customizeController.rig = {};
    customizeController.totalPrice = 0;
    customizeController.product = {};

    customizeController.finishedWizard = finishedWizard;


    function finishedWizard() {
        console.log(customizeController.rig);
    }

    function initializeRigBuilder(response) {

        var Rig = function(options) {
            return {
                product:            options.product,
                totalPrice:         options.totalPrice,
                caseOptions:        options.caseOptions,
                caseCoolingOptions: options.caseCoolingOptions
            }
        };

        customizeController.product = response.data;

        var marks = lodash.filter(customizeController.product.marks, {
            'name': $stateParams.mark || 'Mark 1',
            'brand': $stateParams.brand || 'Intel'
        });
        
        var totalPrice = marks[0].price;
        customizeController.rig = new Rig({
            product : customizeController.product,
            totalPrice : totalPrice
        });

        var specs = marks[0].specs;
        customizeController.rig.caseOptions = getBuilderOption(specs, customizeController.product.specs, { 'type' : 'Case' });
        customizeController.rig.caseCoolingOptions = getBuilderOption(specs, customizeController.product.specs, { 'type' : 'Case Fans' });
        customizeController.totalPrice = totalPrice;
    }

    function setPriceWatchers() {
        // case option price watcher
        $scope.$watch('customizeController.rig.caseOptions', function(newValue, oldValue, scope) {
            var extras = 0;
            if (newValue && newValue['current'] !== newValue['defaultOption']) {
                extras = newValue['current'].price;
            }
            customizeController.rig.totalPrice = customizeController.totalPrice + extras;
        }, true);
    }

    function getBuilderOption(defaultSpecs, allSpecs, specPredicate) {
        var allItems = lodash.filter(allSpecs, specPredicate);
        var defaultItem = lodash.filter(defaultSpecs, specPredicate)[0] || allItems[0];
        var startIndex = lodash.findIndex(allItems, function(item) {
            return item.name === defaultItem.name;
        });

        var current = allItems[startIndex] || {};
        current.price = 0; //reset because price is included

        return {
            current: current,
            items: allItems.slice(startIndex, allItems.length)
        }
    }
    
    customizeController.slugify = function(str) {
        return str.toLowerCase().trim().replace(/\s+/g, '-');
    };

    customizeController.initialize = function(productId) {
        if (productId) {
            ProductService.findById(productId).then(initializeRigBuilder);
        }
    };

    customizeController.initialize($stateParams.productId);
    setPriceWatchers();
}



