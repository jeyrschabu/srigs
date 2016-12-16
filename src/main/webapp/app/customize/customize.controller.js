'use strict';

CustomizeController.$inject = ['$rootScope', '$scope', '$stateParams', '$state', 'lodash', 'ProductService',
  'BuildService', 'CacheFactory', 'observeOnScope', '$uibModal'];

function CustomizeController($rootScope, $scope, $stateParams, $state, lodash, ProductService, BuildService, CacheFactory, observeOnScope, $uibModal) {
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
      customizeController.totalPrice = cachedRig.originalPrice;
      customizeController.rig = cachedRig;
      customizeController.calcTotalPrice();
      rigCache.put(customizeController.product.id, customizeController.rig);

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
         customizeController.rig.originalPrice = totalPrice;
         customizeController.rig.darkFusionSelected = false;
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
    customizeController.rig.performanceReservoirOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Reservoir'});
    customizeController.rig.performanceFittingsOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Fittings'});
    customizeController.rig.performanceCoolantOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Coolant'});
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
    customizeController.rig.accDisplayOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Display'});
    customizeController.rig.accFlashOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Flash'});
    customizeController.rig.accHeadsetOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Headset'});
    customizeController.rig.accKeyboardOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Keyboard'});
    customizeController.rig.accMiceOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Mice'});
    customizeController.rig.accSpeakerOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Speaker'});
    customizeController.rig.accSurgeOptions = getBuilderOption(defaultSpecs, allSpecs, {'type': 'Surge'});
  }

  function getBuilderOption(defaultSpecs, allSpecs, specPredicate) {
    var allItems = lodash.filter(allSpecs, specPredicate);
    var defaultItem = lodash.filter(defaultSpecs, specPredicate)[0];
    var current = allItems[0];

    var type = specPredicate['type'];

    if (!defaultItem && allItems && allItems.length > 0) {
      defaultItem = allItems[0];
    }

    if (defaultItem && allItems.length) {
      var startIndex = lodash.findIndex(allItems, function (item) {
        return item.name === defaultItem.name;
      });

      current = allItems[startIndex];
      if (!allItems[startIndex]) {
        console.log('TYPE ' + specPredicate.type + " has no data")

      } else {
        var currentPrice = allItems[startIndex].price;
        lodash.map(allItems, function(item) {
          item.priceDiff = item.price - currentPrice;
          if (type == 'PSU') {
            item.psuWattage = parseInt(item.name.substr(0, item.name.indexOf('W')));
          }

        })

        current.priceDiff = 0; //reset because price is included
  //      current.price = 0; //reset because price is included
        allItems = allItems.slice(startIndex, allItems.length)

      }
    } else {
      if (!defaultItem) {
        console.log('TYPE ' + specPredicate.type + " has no default item")

      } else {
        console.log('TYPE ' + specPredicate.type + " has no all item")

      }

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
    var typesToCheck = [
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
            'customizeController.rig.internalWifiOptions',
            'customizeController.rig.accDisplayOptions',
            'customizeController.rig.accHeadsetOptions',
            'customizeController.rig.accSpeakerOptions',
            'customizeController.rig.accKeyboardOptions',
            'customizeController.rig.accMiceOptions',
            'customizeController.rig.accFlashOptions',
            'customizeController.rig.accSurgeOptions'

          ];

    if (customizeController.rig && customizeController.rig.product && customizeController.rig.product.name == 'Wraith') {
      typesToCheck = [
        'customizeController.rig.caseOptions',
        'customizeController.rig.caseLedOptions',
        'customizeController.rig.caseCoolingOptions',
        'customizeController.rig.caseCablingOptions',
        'customizeController.rig.performanceCpuOptions',
        'customizeController.rig.performanceCoolingOptions',
        'customizeController.rig.performanceReservoirOptions',
        'customizeController.rig.performanceFittingsOptions',
        'customizeController.rig.performanceCoolantOptions',
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
        'customizeController.rig.internalWifiOptions',
        'customizeController.rig.accDisplayOptions',
        'customizeController.rig.accHeadsetOptions',
        'customizeController.rig.accSpeakerOptions',
        'customizeController.rig.accKeyboardOptions',
        'customizeController.rig.accMiceOptions',
        'customizeController.rig.accFlashOptions',
        'customizeController.rig.accSurgeOptions'

      ];
    }

    typesToCheck.forEach(function (option) {
      observeOnScope($scope, option, true)
        .subscribe(function(change) {
          if (change.newValue) {
            var newPrice = change.newValue['current'].price || 0;
//            customizeController.rig.totalPrice = customizeController.totalPrice + newPrice;
            lodash.map(change.newValue.items, function(item) {
              item.priceDiff = item.price - newPrice;
            })

            // First option selected by default
            if (change.newValue['current'].options && change.newValue['current'].options.length >1) {
              if (!change.newValue['current'].currentOption) {
                change.newValue['current'].currentOption = change.newValue['current'].options[0];

              }
            }

            // Dark Fusion
            if (change.newValue['current'].type == 'System Cooling') {
              if (change.newValue['current'].name.indexOf('Dark Fusion Stage') >= 0) {
                customizeController.rig.darkFusionSelected = true;
              } else {
                customizeController.rig.darkFusionSelected = false;

                // Reset overclocking option
                if (customizeController.rig.performanceOverclockOptions.current.name == 'Overclocking Stage Three (Dark Fusion Required)') {
                  customizeController.rig.performanceOverclockOptions = getBuilderOption(null, customizeController.rig.performanceOverclockOptions.items, {'type': 'Overclocking'});
                }

              }
            }

            // Case only Corsair Carbide 900D enables Dark Fusion Four
            if (change.newValue['current'].type == 'Case') {
              if (change.newValue['current'].name != 'Corsair Carbide 900D') {
                if (customizeController.rig.performanceCoolingOptions.current.name == 'Dark Fusion Stage Four') {
                  customizeController.rig.performanceCoolingOptions = getBuilderOption(null, customizeController.rig.performanceCoolingOptions.items, {'type': 'System Cooling'});
                }
              }
            }

            customizeController.calcTotalWattage();
            customizeController.calcTotalPrice();

            customizeController.rig.status = 'IN_PROGRESS';
            rigCache.put(customizeController.product.id, customizeController.rig);
          }
        });
    });
  };

  customizeController.calcTotalWattage = function () {
    if (customizeController.rig.totalWattage > customizeController.rig.performancePsuOptions.current.psuWattage*0.8) {
      lodash.forEach(customizeController.rig.performancePsuOptions.items, function(item) {
        if (item.psuWattage*0.8 > customizeController.rig.totalWattage) {
          customizeController.rig.performancePsuOptions.current = item;
          return false;
        }
      })
    }

  }

  customizeController.calcTotalPrice = function () {
    // customizeController.rig.totalPrice = customizeController.totalPrice;
    customizeController.rig.totalPrice = 0;
    customizeController.rig.totalWeight = 0;
    customizeController.rig.totalWattage = 0;
    [
      'caseOptions',
      'caseLedOptions',
      'caseCoolingOptions',
      'caseCablingOptions',
      'performanceCpuOptions',
      'performanceCoolingOptions',
      'performanceMotherboardOptions',
      'performanceMemoryOptions',
      'performanceGraphicsOptions',
      'performanceOverclockOptions',
      'performancePsuOptions',
      'storageSsdOptions',
      'storageHddOptions',
      'storageM2Options',
      'storageOpticalOptions',
      'osOptions',
      'internalWifiOptions',
      'accDisplayOptions',
      'accHeadsetOptions',
      'accSpeakerOptions',
      'accKeyboardOptions',
      'accMiceOptions',
      'accFlashOptions',
      'accSurgeOptions'

    ].forEach(function (option) {
      customizeController.rig.totalPrice += customizeController.rig[option]['current'].price;
      customizeController.rig.totalWeight += customizeController.rig[option]['current'].weight;
      customizeController.rig.totalWattage += customizeController.rig[option]['current'].wattage;
    });

  };

  customizeController.selectSubOption = function(parentOption, item, option) {
    if (customizeController.rig[parentOption]['current'].name != item.name) {
      customizeController.rig[parentOption]['current'].currentOption = null;
      customizeController.rig[parentOption]['current'] = item;
      customizeController.rig[parentOption]['current'].currentOption = option;
    }
  }

  $scope.imageSrc = '';

  $scope.openImageModal = function(imageSrc) {
    $scope.imageSrc = imageSrc;
    var modal = $uibModal.open({
        templateUrl: 'myModalContent.html',
        backdrop: true,
        windowClass: 'modal',
        controller: function ($scope, $modalInstance) {
            $scope.imageSrc = imageSrc;
            $scope.closeModal = function () {
                $modalInstance.dismiss('cancel');
            };
        }
    });

    modal.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
    });
  }

  customizeController.initialize($stateParams.productId);
  customizeController.priceWatchers();
}
