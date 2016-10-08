'use strict';

CustomizeController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', 'lodash', 'ProductService',
  'BuildService', 'CacheFactory'];

function CustomizeController($rootScope, $scope, $stateParams, $state, lodash, ProductService, BuildService, CacheFactory) {
  var customizeController = this;

  customizeController.disableSticking = false;
  customizeController.pageTitle = 'Customize';
  $rootScope.bodyClass = customizeController.pageTitle.toLocaleLowerCase();
  customizeController.totalPrice = 0;

  /** all parts to build a rig more coming soon **/
  customizeController.rig = {};
  customizeController.product = {};
  var rigCache = {};
  customizeController.finishedWizard = finishedWizard;

  function finishedWizard() {
    $state.go('checkout', { productId : customizeController.product.id});
  }

  function initializeRigBuilder(response) {
    customizeController.product = response.data;
    var cachedRig = rigCache.get(customizeController.product.id);

    if (cachedRig && cachedRig.status === 'IN_PROGRESS') {
      customizeController.totalPrice = cachedRig.totalPrice;
      customizeController.rig = cachedRig;
    } else {
      var Rig = function (options) {
        return {
          product: options.product
        }
      };

      BuildService.findByProduct(customizeController.product.name, {
        'name': $stateParams.mark || 'Mark 1',
        'brand': $stateParams.brand || 'Intel'
      }).then(function(response) {
        var marks = response.data;
        
        var totalPrice = (marks.length) ? marks[0].price : customizeController.product.price;
        var specs = (marks.length) ? marks[0].specs : customizeController.product.specs;

        customizeController.rig = new Rig({
          product: customizeController.product
        });

        customizeController.totalPrice = totalPrice;
        customizeController.rig.status = 'INITIAL';
        rigCache.put(customizeController.product.id, customizeController.rig);
        initializeBuilderOptions(specs, customizeController.product.specs);
      });
    }
  }

  function initializeBuilderOptions(defaultSpecs, allSpecs) {
    customizeController.rig.caseOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Case'});
    customizeController.rig.caseCoolingOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Case Fans'});
    customizeController.rig.caseLedOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Case LED'});
    customizeController.rig.caseCablingOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Cabling'});
    customizeController.rig.performanceCpuOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'CPU'});
    customizeController.rig.performanceCoolingOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'System Cooling'});
    customizeController.rig.performanceMotherboardOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Motherboard'});
    customizeController.rig.performanceMemoryOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'RAM'});
    customizeController.rig.performanceGraphicsOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'GPU'});
    customizeController.rig.performanceOverclockOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Overclocking'});
    customizeController.rig.performancePsuOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'PSU'});
    customizeController.rig.storageSsdOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Storage-SSD'});
    customizeController.rig.storageHddOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Storage-HDD'});
    customizeController.rig.storageM2Options = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Storage-m2'});
    customizeController.rig.storageOpticalOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Optical'});
    customizeController.rig.osOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'OS'});
    customizeController.rig.internalWifiOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Internal-WiFi'});
  }

  function getBuilderOption(defaultSpecs, allSpecs, specPredicate) {
    var allItems = lodash.filter(allSpecs, specPredicate);
    var defaultItem = lodash.filter(defaultSpecs, specPredicate)[0];
    var current = allItems[0];

    if (defaultItem && allItems.length) {
      var startIndex = lodash.findIndex(allItems, function (item) {
        return item.name === defaultItem.name;
      });

      current = allItems[startIndex];
      current.price = 0; //reset because price is included
      allItems = allItems.slice(startIndex, allItems.length)
    }

    return {
      current: current,
      items: allItems
    }
  }

  customizeController.slugify = function (str) {
    return str.toLowerCase().trim().replace(/\s+/g, '-');
  };

  customizeController.initialize = function (productId) {
    if (!CacheFactory.get('rigCache')) {
      CacheFactory.createCache('rigCache', {
        deleteOnExpire: 'aggressive',
        recycleFreq: 60000
      });
    }
    rigCache = CacheFactory.get('rigCache');

    if (productId) {
      ProductService.findById(productId).then(initializeRigBuilder);
    }
  };

  customizeController.priceWatchers = function () {
    var options = [
      'customizeController.rig.caseOptions',
      'customizeController.rig.caseLedOptions',
      'customizeController.rig.caseCoolingOptions',
      'customizeController.rig.caseCablingOptions',
      'customizeController.rig.performanceCpuOptions',
      'customizeController.rig.performanceCoolingOptions',
      'customizeController.rig.performanceMotherboardOptions',
      'customizeController.rig.performanceMemoryOptions',
      'customizeController.rig.performanceGraphicsOptions',
      'customizeController.rig.performanceOverclockOptions',
      'customizeController.rig.performancePsuOptions',
      'customizeController.rig.storageSsdOptions',
      'customizeController.rig.storageHddOptions',
      'customizeController.rig.storageM2Options',
      'customizeController.rig.storageOpticalOptions',
      'customizeController.rig.osOptions',
      'customizeController.rig.internalWifiOptions'
    ];

    options.forEach(function (option) {
      $scope.$watch(option, function (newValue, oldValue, scope) {
        if (newValue) {
          var newPrice = newValue['current'].price || 0;
          customizeController.rig.totalPrice = customizeController.totalPrice + newPrice;
          customizeController.rig.status = 'IN_PROGRESS';
          rigCache.put(customizeController.product.id, customizeController.rig);
        }
      }, true);
    });
  };

  customizeController.initialize($stateParams.productId);
  customizeController.priceWatchers();
}



