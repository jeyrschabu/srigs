'use strict';

angular.module('rigs.customize', ['mgo-angular-wizard', 'rigs.services.products'])
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
    .controller('CustomizeController', CustomizeController);
