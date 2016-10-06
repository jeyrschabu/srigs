'use strict';

function BuildService($http, CacheFactory, API_PREFIX) {
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
    }
  }
}

