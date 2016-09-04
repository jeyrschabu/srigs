'use strict';

CustomizeController.$inject = ['$rootScope', '$scope', '$stateParams', '$state','lodash', 'ProductService', 'PaymentService', 'ngCart'];

function CustomizeController($rootScope, $scope, $stateParams, $state, lodash, ProductService, PaymentService, ngCart) {
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

    function displaySuccessMessage() {
        //TODO: display a message saying an email will be sent to them after with details about the shipping
        ngCart.empty(true);
        $state.go('home');
    }

    function handleError(error) {
        console.log('an error occured', error);
    }

    customizeController.paymentOptions = {
        onPaymentMethodReceived: function(payload) {
            angular.merge(payload, ngCart.toObject());
            payload.total = payload.totalCost;
            PaymentService.submitPayment(new Order(payload.nonce)).then(displaySuccessMessage, handleError);
        }
    };

    var Order = function(nonce) {
        return {
            paymentInfo: nonce,
            username: 'me@gmail.com',
            total: 1212,
            shippingAddress: {
                street: '405 NW Uptown Terrace',
                state: 'OR',
                zip: '97210'
            },

            billingAddress: {
                street: '405 NW Uptown Terrace',
                state: 'OR',
                zip: '97210'
            },

            lineItems: [
                {
                    name: 'Shade',
                    quantity: 1,
                    productId: 'adfasdfsdfsdf',
                    price: 1200,
                    specs: [
                        {
                            name: 'Corsair 450D',
                            type: 'case'
                        }
                    ]
                }
            ]
        }
    };


    function initializeRigBuilder(response) {
        customizeController.product = response.data;
        var rigInProgress = ngCart.getItemById(customizeController.product.id);
        if (rigInProgress) {
            customizeController.rig = rigInProgress._data;
        } else {
            var marks = lodash.filter(customizeController.product.marks, {
                'name': $stateParams.mark || 'Mark 1',
                'brand': $stateParams.brand || 'Intel'
            });

            var totalPrice = (marks.length) ? marks[0].price : customizeController.product.price;
            var specs = (marks.length) ? marks[0].specs : customizeController.product.specs;

            var Rig = function(options) {
                return {
                    product: options.product
                }
            };

            customizeController.rig = new Rig({
                product : customizeController.product
            });

            initializeBuilderOptions(specs, customizeController.product.specs);
            customizeController.totalPrice = totalPrice;
        }
    }

    function initializeBuilderOptions(defaultSpecs, allSpecs) {
        customizeController.rig.caseOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Case' });
        customizeController.rig.caseCoolingOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Case Fans' });
        customizeController.rig.caseLedOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Case LED' });
        customizeController.rig.caseCablingOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Cabling' });
        customizeController.rig.performanceCpuOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'CPU' });
        customizeController.rig.performanceCoolingOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'System Cooling' });
        customizeController.rig.performanceMotherboardOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Motherboard' });
        customizeController.rig.performanceMemoryOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'RAM' });
        customizeController.rig.performanceGraphicsOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'GPU' });
        customizeController.rig.performanceOverclockOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Overclocking' });
        customizeController.rig.performancePsuOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'PSU' });
        customizeController.rig.storageSsdOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Storage-SSD' });
        customizeController.rig.storageHddOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Storage-HDD' });
        customizeController.rig.storageM2Options = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Storage-m2' });
        customizeController.rig.storageOpticalOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Optical' });
        customizeController.rig.osOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'OS' });
        customizeController.rig.internalWifiOptions = getBuilderOption(defaultSpecs, allSpecs, { 'type' : 'Internal-WiFi' });
    }

    function getBuilderOption(defaultSpecs, allSpecs, specPredicate) {
        var allItems = lodash.filter(allSpecs, specPredicate);
        var defaultItem = lodash.filter(defaultSpecs, specPredicate)[0];
        var current = {};

        if (defaultItem && allItems.length) {
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
            'customizeController.rig.caseCablingOptions',
            'customizeController.rig.performanceCpuOptions',
            'customizeController.rig.performanceCoolingOptions',
            'customizeController.rig.performanceMotherboardOptions',
            'customizeController.rig.performanceMemoryOptions',
            'customizeController.rig.performanceGraphicsOptions',
            'customizeController.rig.performanceOverclockOptions',
            'customizeController.rig.performancePsuOptions'
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



