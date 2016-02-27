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

        return {
            list : getProducts,
            listByCategory : getProductsByCategory
        };
    });

