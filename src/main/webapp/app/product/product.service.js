'use strict';

angular
    .module('Product')
    .service('productService', function($http) {
        function getProducts() {
            return $http({
                url: '/api/v1/products',
                method: 'GET'
            });
        }

        function getProductsByCategory(category) {
            return $http({
                url: '/api/v1/products/categories/'+category,
                method: 'GET'
            });
        }

        function findById(productId) {
            return $http({
                url: '/api/v1/products/'+productId,
                method: 'GET'
            });
        }

        return {
            list : getProducts,
            listByCategory : getProductsByCategory,
            findById: findById
        };
    });
