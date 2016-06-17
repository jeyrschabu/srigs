'use strict';

angular
    .module('Home')
    .service('categoryService', function($http){
        function getCategories(){
            return $http({
                url: '/api/v1/categories',
                method: 'GET'
            });
        }

        return {
            list : getCategories
        };
    });

