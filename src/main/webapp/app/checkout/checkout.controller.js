'use strict';

CheckoutController.$inject = ['$stateParams', 'ngCart', 'CacheFactory', 'PaymentService'];
function CheckoutController($stateParams, ngCart, CacheFactory, PaymentService) {
  var checkoutController = this;

  var userInfo = {
    billingAddress: {},
    shippingAddress: {}
  };

  checkoutController.paymentOptions = {
    onPaymentMethodReceived: function (payload) {
      angular.merge(payload, ngCart.toObject());
      payload.total = payload.totalCost;
      PaymentService.submitPayment(new Order(payload.nonce)).then(displaySuccessMessage, handleError);
    }
  };

  var Order = function (nonce) {
    return {
      paymentInfo: nonce,
      username: 'me@gmail.com',
      total: 1212,
      shippingAddress: {
        street: '405 NW Uptown Terrace',
        state: 'OR',
        zip: '97210'
      },

      billingAddress: {
        street: '405 NW Uptown Terrace',
        state: 'OR',
        zip: '97210'
      },

      lineItems: [
        {
          name: 'Shade',
          quantity: 1,
          productId: 'adfasdfsdfsdf',
          price: 1200,
          specs: [
            {
              name: 'Corsair 450D',
              type: 'case'
            }
          ]
        }
      ]
    }
  };


  function displaySuccessMessage() {
    //TODO: display a message saying an email will be sent to them after with details about the shipping
    ngCart.empty(true);
    $state.go('home');
  }

  function handleError(error) {
    console.log('an error occured', error);
  }

  function initialize(productId) {
    var cache = CacheFactory.get("rigCache");
    if (productId && cache) {
      var rig = cache.get(productId);
      var cartItem = ngCart.getItemById(productId);

      if (cartItem) {
        ngCart.removeItem(cartItem.getId());
      }
      ngCart.addItem(
        rig.product.id,
        rig.product.name,
        rig.totalPrice,
        1
      );
    }
  }

  initialize($stateParams.productId)

}
