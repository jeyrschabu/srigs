'use strict';

angular.module('rigs.customize', ['mgo-angular-wizard', 'rigs.services.products', 'rigs.services.builds'])
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
        }])
    .controller('CustomizeController', CustomizeController);
