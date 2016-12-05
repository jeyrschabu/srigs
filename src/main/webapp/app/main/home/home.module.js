'use strict';

angular.module('rigs.home', ['rigs.categories'])
    .config(['$stateProvider', function($stateProvider) {
    
        $stateProvider
            .state('home', {
                url:'/',
                views: {
                    'content': {
                        templateUrl: '/app/main/home/home.template.html',
                        controller: 'HomeController as homeController'
                    },
                    'categories': {
                        templateUrl: '/app/main/home/categories/categories.template.html',
                        controller: 'CategoryController as categoryController'
                    }
                }
            })
    }])
    .controller('HomeController', HomeController);
