'use strict';

angular.module('Customize', ['ui.router']);
angular.module('Customize').config(['$stateProvider', function($stateProvider) {

    $stateProvider
        .state('customize', {
            url:'/customize/:productId/:mark' ,
            views: {
                'content':{
                    templateUrl: '/app/customize/partials/customize.html',
                    controller: 'CustomizeController'
                }
            }
        }).state('customize.makeityours', {
            url:'/makeityours' ,
            views: {
                'makeityours@customize': {
                    templateUrl: '/app/customize/partials/customize/makeityours.html',
                    controller: 'CustomizeController'
                }
            }
        }).state('customize.performance', {
            url:'/performance' ,
            views: {
                'performance@customize': {
                    templateUrl: '/app/customize/partials/customize/performance.html',
                    controller: 'CustomizeController'
                }
            }
        }).state('customize.storage', {
            url:'/storage' ,
            views: {
                'storage@customize': {
                    templateUrl: '/app/customize/partials/customize/storage.html',
                    controller: 'CustomizeController'
                }
            }
        }).state('customize.accessories', {
            url:'/accessories' ,
            views: {
                'accessories@customize': {
                    templateUrl: '/app/customize/partials/customize/accessories.html',
                    controller: 'CustomizeController'
                }
            }
        })
}]);
