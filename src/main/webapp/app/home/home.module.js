'use strict';
angular.module('Home', []);
angular.module('Home').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url:'/home',
            views: {
                'content':{
                    templateUrl: '/app/home/partials/home.html',
                    controller: 'HomeController'
                }
            }
        }).state('support', {
        url:'/support',
        views: {
            'content':{
                templateUrl: '/app/home/partials/support.html',
                controller: 'SupportController'
            }
        }
    }).state('the-crew', {
        url:'/the-crew',
        views: {
            'content':{
                templateUrl: '/app/home/partials/the-crew.html',
                controller: 'CrewController'
            }
        }
    });
}]);
