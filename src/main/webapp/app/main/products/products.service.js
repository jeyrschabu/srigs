'use strict';

angular.module('rigs.services.products', [])
    .service('ProductService', function($http, API_PREFIX) {
        var service = this;

        function getProducts() {
            return $http({
                url: API_PREFIX +'/products',
                method: 'GET'
            });
        }

        function getProductsByCategory(category) {
            return $http({
                url: API_PREFIX + '/products/categories/'+ category,
                method: 'GET'
            });
        }

        function findById(productId) {
            return $http({
                url: API_PREFIX + '/products/'+ productId,
                method: 'GET'
            });
        }

        service.list = getProducts;
        service.listByCategory = getProductsByCategory;
        service.findById = findById;
        
    });

