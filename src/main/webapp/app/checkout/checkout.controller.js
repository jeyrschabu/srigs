'use strict';

CheckoutController.$inject = ['$stateParams', '$state', '$location', 'ngCart', 'CacheFactory', 'PaymentService', '$braintree', 'lodash'];
function CheckoutController($stateParams, $state, $location, ngCart, CacheFactory, PaymentService, $braintree, lodash) {
  var checkoutController = this;

  checkoutController.userInfo = {
    email: '',
    firstName: '',
    lastName: '',
    email2: '',
    comments: '',
    billingAddress: {},
    shippingAddress: {}
  };
  checkoutController.sameAsShipping = false;
  var client = null;

  checkoutController.paymentOptions = {
    onPaymentMethodReceived: function (payload) {
      angular.merge(payload, ngCart.toObject());
      payload.total = payload.totalCost;
      PaymentService.submitPayment(new Order(payload.nonce)).then(displaySuccessMessage, handleError);
    }
  };


  var client;

  var startup = function() {
    $braintree.getClientToken().success(function(token) {
      client = new $braintree.api.Client({
        clientToken: token
      });
    });
  }

  checkoutController.creditCard = {
    number: '5555555555554444',
    expirationMonth: '01',
    expirationYear: '22',
    cvv: '123'
  };
  // checkoutController.creditCard.expirationMonth = '';
  // checkoutController.creditCard.expirationYear = '';

  checkoutController.payButtonClicked = function() {

    if (validateFields() == true) {
      // - Validate checkoutController.creditCard
      // - Make sure client is ready to use

      client.tokenizeCard({
        number: checkoutController.creditCard.number,
        expirationDate: checkoutController.creditCard.expirationMonth + '/' + checkoutController.creditCard.expirationYear,
        cvv: checkoutController.creditCard.cvv
      }, function (err, nonce) {

        if (err) {
          alert('Error occurred when processing the transaction')
        } else {
          var order = setOrderItems(nonce);

          PaymentService.submitPayment(order).then(displaySuccessMessage, handleError);

        }


      });

    }

  };


  var validateFields = function() {
    var valid = false;
    if (checkoutController.userInfo.shippingAddress.firstName && checkoutController.userInfo.shippingAddress.lastName && checkoutController.userInfo.shippingAddress.address1 && checkoutController.userInfo.shippingAddress.country && checkoutController.userInfo.shippingAddress.city && checkoutController.userInfo.shippingAddress.state && checkoutController.userInfo.shippingAddress.zip && checkoutController.userInfo.email && checkoutController.userInfo.email2 && checkoutController.creditCard.number && checkoutController.creditCard.expirationYear && checkoutController.creditCard.expirationMonth && checkoutController.creditCard.cvv) {
      valid = true;
    }

    if (valid && !(checkoutController.sameAsShipping || (checkoutController.userInfo.billingAddress.firstName && checkoutController.userInfo.billingAddress.lastName && checkoutController.userInfo.billingAddress.address1 && checkoutController.userInfo.billingAddress.country && checkoutController.userInfo.billingAddress.city && checkoutController.userInfo.billingAddress.state && checkoutController.userInfo.billingAddress.zip))) {
      valid = false;
    }

    if (valid == false) {
      alert('Input all the required fields and try again.');
      return false;
    }

    if (valid && (checkoutController.userInfo.email != checkoutController.userInfo.email2)) {
      valid = false;
    }

    if (!valid) {
      alert('Confirmation email did not match');
      return false;
    }

    return true;


  }

  var setOrderItems = function(nonce) {
    var order = new Order(nonce);
    var cart = ngCart.toObject();
    order.username = checkoutController.userInfo.username;
    order.total = cart.totalCost;
    var items = ngCart.getCart().items;

    order.lineItems = [];

    lodash.forEach(items, function(item) {
      var product = {
        name: item.getName(),
        quantity: item.getQuantity(),
        productId: item.getId(),
        price: item.getTotal(),
        specs: [
          {
            name: item.getData().caseOptions.current.name,
            type: 'Case'
          },
          {
            name: item.getData().caseCoolingOptions.current.name,
            type: 'Case Fans'
          },
          {
            name: item.getData().caseLedOptions.current.name,
            type: 'Case LED'
          },
          {
            name: item.getData().caseCablingOptions.current.name,
            type: 'Cabling'
          },
          {
            name: item.getData().performanceCpuOptions.current.name,
            type: 'CPU'
          },
          {
            name: item.getData().performanceCoolingOptions.current.name,
            type: 'System Cooling'
          },
          {
            name: item.getData().performanceMotherboardOptions.current.name,
            type: 'Motherboard'
          },
          {
            name: item.getData().performanceMemoryOptions.current.name,
            type: 'RAM'
          },
          {
            name: item.getData().performanceGraphicsOptions.current.name,
            type: 'GPU'
          },
          {
            name: item.getData().performanceOverclockOptions.current.name,
            type: 'Overclocking'
          },
          {
            name: item.getData().performancePsuOptions.current.name,
            type: 'PSU'
          },
          {
            name: item.getData().storageSsdOptions.current.name,
            type: 'Storage-SSD'
          },
          {
            name: item.getData().storageM2Options.current.name,
            type: 'Storage-m2'
          },
          {
            name: item.getData().storageHddOptions.current.name,
            type: 'Storage-HDD'
          },
          {
            name: item.getData().storageOpticalOptions.current.name,
            type: 'Optical'
          },
          {
            name: item.getData().osOptions.current.name,
            type: 'OS'
          },
          {
            name: item.getData().internalWifiOptions.current.name,
            type: 'Internal-WiFi'
          },
          {
            name: item.getData().accDisplayOptions.current.name,
            type: 'Display'
          },
          {
            name: item.getData().accHeadsetOptions.current.name,
            type: 'Headset'
          },
          {
            name: item.getData().accSpeakerOptions.current.name,
            type: 'Speaker'
          },
          {
            name: item.getData().accKeyboardOptions.current.name,
            type: 'Keyboard'
          },
          {
            name: item.getData().accMiceOptions.current.name,
            type: 'Mice'
          },
          {
            name: item.getData().accFlashOptions.current.name,
            type: 'Flash'
          },
          {
            name: item.getData().accSurgeOptions.current.name,
            type: 'Surge'
          }
        ]
      };

      if (item.getData().performanceReservoirOptions.current && item.getData().performanceReservoirOptions.current.currentOption) {
        product.specs.push({name: item.getData().performanceReservoirOptions.current.name, type: 'Reservoir'})
      }

      if (item.getData().performanceFittingsOptions.current && item.getData().performanceFittingsOptions.current.currentOption) {
        product.specs.push({name: item.getData().performanceFittingsOptions.current.name, type: 'Fittings'})
      }

      if (item.getData().performanceCoolantOptions.current && item.getData().performanceCoolantOptions.current.currentOption) {
        product.specs.push({name: item.getData().performanceCoolantOptions.current.name, type: 'Coolant'})
      }

      order.lineItems.push(product);
    })

    order.shippingAddress = checkoutController.userInfo.shippingAddress;
    if (checkoutController.sameAsShipping) {
      order.billingAddress = order.shippingAddress;
    } else {
      order.billingAddress = checkoutController.userInfo.billingAddress;
    }

    order.shippingAddress.street = order.shippingAddress.address1 + " " + order.shippingAddress.address2
    order.billingAddress.street = order.billingAddress.address1 + " " + order.billingAddress.address2
    order.username = checkoutController.userInfo.email;

    return order;


  }



  var Order = function (nonce) {
    return {
      paymentInfo: nonce,
      username: 'me@gmail.com',
      total: 0,
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


  function displaySuccessMessage(res) {
    //TODO: display a message saying an email will be sent to them after with details about the shipping
    alert('Checkout has been proccessed successfully. An email has been sent to your account.')
    ngCart.empty(true);
    $state.go('home');
  }

  function handleError(error) {
    console.log('an error occured', error);
    checkoutController.error = error;
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
        1,
        rig
      );

      checkoutController.rig = rig;
    }
  }

  startup();
  initialize($stateParams.productId)

}
