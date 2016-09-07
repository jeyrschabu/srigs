'use strict';

angular.module('rigs.customize', ['mgo-angular-wizard', 'rigs.services.products'])
    .constant('clientTokenPath', '/api/v1/payment/clientToken')
    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('customize', {
                url:'/customize/:productId/:mark/:brand' ,
                views: {
                    'content':{
                        templateUrl: '/app/customize/customize.template.html',
                        controller: 'CustomizeController as customizeController'
                    }
                }
            })
            .state('checkout', {
                url:'/checkout' ,
                views: {
                    'content':{
                        templateUrl: '/app/customize/customize-templates/checkout.template.html',
                        controller: 'CustomizeController as customizeController'
                    }
                }
            })
        }])
    .service('PaymentService', PaymentService)
    .controller('CustomizeController', CustomizeController);
