'use strict';

angular
    .module('MainApp')
    .service('featureService', function($http){
        function getFeatures() {
            return $http({
                url: '/v1/features',
                method: 'GET'
            });
        }

        return {
            list : getFeatures
        };
    });

