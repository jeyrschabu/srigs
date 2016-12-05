'use strict';

angular.module('rigs.services.products', [])
  .service('ProductService', function ($http, CacheFactory, API_PREFIX) {
    if (!CacheFactory.get('productCache')) {
      CacheFactory.createCache('productCache', {
        deleteOnExpire: 'aggressive',
        recycleFreq: 60000
      });
    }

    var productCache = CacheFactory.get('productCache');
    return {
      list: function() {
        return $http.get(API_PREFIX + '/products', { cache: productCache});
      },

      listByCategory: function(category) {
        return $http.get(API_PREFIX + '/products/categories/' + category, { cache: productCache});
      },

      findById: function(productId) {
        return $http.get(API_PREFIX + '/products/' + productId, { cache: productCache});
      }
    };
  });

