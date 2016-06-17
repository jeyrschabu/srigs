'use strict';

angular.module('Product', ['Home']);
angular.module('Product').config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('products', {
            url:'/products',
            views: {
                'content':{
                    templateUrl: '/app/product/partials/products.html',
                    controller: 'ProductController'
                }
            }
        }).state('category', {
            url:'/products/:category',
            views: {
                'content':{
                    templateUrl: '/app/product/partials/product-category.html',
                    controller: 'ProductController'
                }
            }
        }).state('detail', {
            url:'/products/:category/:name/:productId',
            views: {
                'content':{
                    templateUrl: function($stateParams) {
                        return '/app/product/partials/' + $stateParams.name +'.html';
                    },
                    controller: 'ProductController'
                }
            }
         });
}]);
