'use strict';

function CategoryService($http) {
    var categoryService = this;

    function getCategories() {
        return $http({
            url: '/api/v1/categories',
            method: 'GET'
        });
    }

    categoryService.list = getCategories;
}


