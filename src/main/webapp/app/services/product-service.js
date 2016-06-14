'use strict';

angular
    .module('MainApp')
    .service('productService', function($http){
        function getProducts() {
            return $http({
                url: '/v1/products',
                method: 'GET'
            });
        }

        function getProductsByCategory(category) {
            return $http({
                url: '/v1/products/categories/'+category,
                method: 'GET'
            });
        }

        function findById(productId) {
            return $http({
                url: '/v1/products/'+productId,
                method: 'GET'
            });
        }

        return {
            list : getProducts,
            listByCategory : getProductsByCategory,
            findById: findById
        };
    });

