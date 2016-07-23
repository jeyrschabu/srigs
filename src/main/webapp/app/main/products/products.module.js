'use strict';

angular.module('rigs.products', ['rigs.services.products'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
           .state('products', {
                url:'/products/:category',
                views: {
                    'content':{
                        templateUrl: '/app/main/products/products.template.html',
                        controller: 'ProductController as productController'
                    }
                }
            }).state('product-detail', {
                url:'/products/:name/:productId',
                views: {
                    'content':{
                        templateUrl: function($stateParams) {
                            return '/app/main/products/product-templates/' + $stateParams.name +'.template.html';
                        },
                        controller: 'ProductDetailController as productDetailController'
                    }
                }
             });
    }])
    .controller('ProductController', ProductController)
    .controller('ProductDetailController', ProductDetailController);