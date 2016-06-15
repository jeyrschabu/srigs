'use strict';

angular
    .module('MainApp')
    .service('specService', function($http) {
        function getSpecs() {
            return $http({
                url: '/api/v1/specs',
                method: 'GET'
            });
        }

        function find(key, value) {
            return $http({
                url: '/api/v1/specs/'+key +'/' + value,
                method: 'GET'
            });
        }

        function findById(specId) {
            return $http({
                url: '/api/v1/specs/'+specId,
                method: 'GET'
            });
        }

        return {
            list : getSpecs,
            find : find,
            findById: findById
        };
    });

