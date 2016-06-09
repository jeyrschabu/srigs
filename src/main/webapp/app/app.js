'use strict';

angular.module('MainApp', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'sticky']);
angular.module('MainApp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url:'/home',
            views: {
                'content':{
                    templateUrl: '/app/partials/home.html',
                    controller: 'HomeController'
                }
            }
        }).state('support', {
            url:'/support',
            views: {
                'content':{
                    templateUrl: '/app/partials/support.html',
                    controller: 'SupportController'
                }
            }
        }).state('contact', {
            url:'/contact',
            views: {
                'content':{
                    templateUrl: '/app/partials/contact.html',
                    controller: 'ContactController'
                }
            }
        }).state('the-crew', {
            url:'/the-crew',
            views: {
                'content':{
                    templateUrl: '/app/partials/the-crew.html',
                    controller: 'warranty-controller'
                }
            }
        }).state('products', {
            url:'/products',
            views: {
                'content':{
                    templateUrl: '/app/partials/products.html',
                    controller: 'ProductController'
                }
            }
        }).state('product-category', {
            url:'/products/:category',
            views: {
                'content':{
                    templateUrl: '/app/partials/product-category.html',
                    controller: 'ProductController'
                }
            }
        // I'm sure this isn't the right way
        }).state('phantom', {
            url:'/products/gaming/phantom',
            views: {
                'content':{
                    templateUrl: '/app/partials/products/phantom.html',
                    controller: 'ProductController'
                }
            }
        }).state('specter', {
            url:'/products/gaming/specter',
            views: {
                'content':{
                    templateUrl: '/app/partials/products/specter.html',
                    controller: 'ProductController'
                }
            }
        }).state('wraith', {
            url:'/products/gaming/wraith',
            views: {
                'content':{
                    templateUrl: '/app/partials/products/wraith.html',
                    controller: 'ProductController'
                }
            }
        }).state('shade', {
            url:'/products/gaming/shade',
            views: {
                'content':{
                    templateUrl: '/app/partials/products/shade.html',
                    controller: 'ProductController'
                }
            }
        }).state('product', {
            url:'/product/:id',
            views: {
                'content':{
                    templateUrl: '/app/partials/product-long-description.html',
                    controller: 'ProductController'
                }
            }
        }).state('customize', {
            url:'/customize/:id',
            views: {
                'content':{
                    templateUrl: '/app/partials/customize-wizard.html',
                    controller: 'ProductController'
                }
            }
        }).state('customize-accessories', {
            url:'/customize-accessories/',
            views: {
                'content':{
                    templateUrl: '/app/partials/customize/accessories.html',
                    controller: 'ProductController'
                }
            }
        });

}]).run( function($rootScope) {
    $rootScope.$on('$locationChangeStart', function() {

    });
});
