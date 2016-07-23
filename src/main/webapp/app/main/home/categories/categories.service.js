'use strict';

function CategoryService($http, API_PREFIX) {
    var categoryService = this;

    function getCategories() {
        return $http({
            url: API_PREFIX + '/categories',
            method: 'GET'
        });
    }

    categoryService.list = getCategories;
}


