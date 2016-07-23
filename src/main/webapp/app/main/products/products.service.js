'use strict';

angular.module('rigs.services.products', [])
    .service('ProductService', function($http) {
        var service = this;

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

        service.list = getProducts;
        service.listByCategory = getProductsByCategory;
        service.findById = findById;
        
    });

