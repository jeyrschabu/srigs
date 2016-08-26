'use strict';

CustomizeController.$inject = ['$rootScope', '$scope', '$stateParams', 'lodash', 'ProductService', 'ngCart'];

function CustomizeController($rootScope, $scope, $stateParams, lodash, ProductService, ngCart) {
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
        customizeController.product = response.data;
        var rigInProgress = ngCart.getItemById(customizeController.product.id);
        if (rigInProgress) {
            customizeController.rig = rigInProgress._data;
        } else {
            var Rig = function(options) {
                return {
                    product:            options.product,
                    totalPrice:         options.totalPrice,
                    caseOptions:        options.caseOptions,
                    caseCoolingOptions: options.caseCoolingOptions,
                    caseLedOptions:     options.caseLedOptions,
                    caseCablingOptions: options.caseCablingOptions
                }
            };


            var marks = lodash.filter(customizeController.product.marks, {
                'name': $stateParams.mark || 'Mark 1',
                'brand': $stateParams.brand || 'Intel'
            });

            var totalPrice = (marks.length) ? marks[0].price : customizeController.product.price;
            var specs = (marks.length) ? marks[0].specs : customizeController.product.specs;

            customizeController.rig = new Rig({
                product : customizeController.product,
                totalPrice : totalPrice
            });

            customizeController.rig.caseOptions = getBuilderOption(specs, customizeController.product.specs, { 'type' : 'Case' });
            customizeController.rig.caseCoolingOptions = getBuilderOption(specs, customizeController.product.specs, { 'type' : 'Case Fans' });
            customizeController.rig.caseLedOptions = getBuilderOption(specs, customizeController.product.specs, { 'type' : 'Case LED' });
            customizeController.rig.caseCablingOptions = getBuilderOption(specs, customizeController.product.specs, { 'type' : 'Cabling' });
            customizeController.totalPrice = totalPrice;
        }


    }

    function getBuilderOption(defaultSpecs, allSpecs, specPredicate) {
        var allItems = lodash.filter(allSpecs, specPredicate);
        var defaultItem = lodash.filter(defaultSpecs, specPredicate)[0];
        var current = {};

        if (defaultItem) {
            var startIndex = lodash.findIndex(allItems, function(item) {
                return item.name === defaultItem.name;
            });

            current = allItems[startIndex];
            current.price = 0; //reset because price is included
            allItems = allItems.slice(startIndex, allItems.length)
        }

        return {
            current: current,
            items: allItems
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

    customizeController.priceWatchers = function() {
        var options = [
            'customizeController.rig.caseOptions',
            'customizeController.rig.caseLedOptions',
            'customizeController.rig.caseCoolingOptions',
            'customizeController.rig.caseCablingOptions'
        ];

        options.forEach(function(option) {
            $scope.$watch(option, function(newValue, oldValue, scope) {
                if (newValue) {
                    var newPrice = newValue['current'].price || 0;
                    customizeController.rig.totalPrice = customizeController.totalPrice + newPrice;
                }
            }, true);
        });
    };

    customizeController.initialize($stateParams.productId);
    customizeController.priceWatchers();
}



