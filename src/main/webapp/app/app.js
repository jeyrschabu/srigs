'use strict';

angular.module('MainApp', ['ui.router', 'ngAnimate', 'sticky', 'jkuri.gallery']);
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
                    controller: 'CrewController'
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
        }).state('category', {
            url:'/products/:category',
            views: {
                'content':{
                    templateUrl: '/app/partials/product-category.html',
                    controller: 'ProductController'
                }
        }}).state('detail', {
            url:'/products/:category/:name/:productId',
            views: {
                'content':{
                    templateUrl: function($stateParams) {
                        return '/app/partials/products/' + $stateParams.name +'.html';
                    },
                    controller: 'ProductController'
                }
            }
        }).state('customize', {
            url:'/customize/:productId/' ,
            views: {
                'content':{
                    templateUrl: '/app/partials/customize-wizard.html',
                    controller: 'RigBuilderController'
                }
            }
        //temporary for dev
    }).state('customize-accessories', {
        url:'/customize-accessories/',
        views: {
            'content':{
                templateUrl: '/app/partials/customize/accessories.html',
                controller: 'ProductController'
            }
        }
        //temporary for form styling
    }).state('forms', {
        url:'/forms/',
        views: {
            'content':{
                templateUrl: '/app/partials/forms/template.html',
                controller: 'ProductController'
            }
        }
    });

}]).run( function($rootScope) {
    $rootScope.$on('$locationChangeStart', function() {

    });
});
