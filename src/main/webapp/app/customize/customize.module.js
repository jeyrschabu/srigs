'use strict';

angular.module('Customize', ['Product']);
angular.module('Customize').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('customize', {
            url:'/customize/:productId' ,
            views: {
                'content':{
                    templateUrl: '/app/customize/partials/customize.html',
                    controller: 'CustomizeController'
                }
            }
        }).state('customize.makeityours', {
            url:'makeityours' ,
            views: {
                'content':{
                    templateUrl: '/app/customize/partials/customize/makeityours.html',
                    controller: 'CustomizeController'
                }
            }
        }).state('customize.performance', {
            url:'performance' ,
            views: {
                'content':{
                    templateUrl: '/app/customize/partials/customize/performance.html',
                    controller: 'CustomizeController'
                }
            }
        })
}]);
