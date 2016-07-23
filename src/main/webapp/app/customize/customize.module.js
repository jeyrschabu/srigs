'use strict';

angular.module('rigs.customize', ['rigs.services.products']).config(['$stateProvider', function($stateProvider) {

    $stateProvider
        .state('customize', {
            url:'/customize/:productId/:mark/:brand' ,
            views: {
                'content':{
                    templateUrl: '/app/customize/customize.template.html',
                    controller: 'CustomizeController as customizeController'
                }
            }
        }).state('customize.makeityours', {
            url:'/makeityours' ,
            views: {
                'makeityours@customize': {
                    templateUrl: '/app/customize/customize-templates/makeityours.template.html',
                    controller: 'CustomizeController as customizeController'
                }
            }
        }).state('customize.performance', {
            url:'/performance' ,
            views: {
                'performance@customize': {
                    templateUrl: '/app/customize/customize-templates/performance.template.html',
                    controller: 'CustomizeController as customizeController'
                }
            }
        }).state('customize.storage', {
            url:'/storage' ,
            views: {
                'storage@customize': {
                    templateUrl: '/app/customize/customize-templates/storage.template.html',
                    controller: 'CustomizeController as customizeController'
                }
            }
        }).state('customize.accessories', {
            url:'/accessories' ,
            views: {
                'accessories@customize': {
                    templateUrl: '/app/customize/customize-templates/accessories.template.html',
                    controller: 'CustomizeController as customizeController'
                }
            }
        })
    }])
    .controller('CustomizeController', CustomizeController);
