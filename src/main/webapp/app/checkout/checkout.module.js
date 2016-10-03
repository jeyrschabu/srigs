'use strict';

angular.module('rigs.checkout', [])
  .constant('clientTokenPath', '/api/v1/payment/clientToken')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout/:productId',
        views: {
          'content': {
            templateUrl: '/app/checkout/checkout.template.html',
            controller: 'CheckoutController as checkoutController'
          }
        }
      })
  }])
  .service('PaymentService', PaymentService)
  .controller('CheckoutController', CheckoutController);

