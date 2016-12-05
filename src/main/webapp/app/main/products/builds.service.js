'use strict';

angular.module('rigs.services.builds', [])
  .service('BuildService', function BuildService($http, CacheFactory, API_PREFIX) {
    if (!CacheFactory.get('buildCache')) {
      CacheFactory.createCache('buildCache', {
        deleteOnExpire: 'aggressive',
        recycleFreq: 60000
      });
    }

    var buildCache = CacheFactory.get('buildCache');
    return {
      list: function () {
        return $http.get(API_PREFIX + '/builds', {cache: buildCache});
      },
      findByProduct: function(productName, params) {
        return $http.get(API_PREFIX + '/builds/' + productName, {
          cache: buildCache,
          params: params
        })
      }
    }
  });

