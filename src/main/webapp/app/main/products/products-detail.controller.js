'use strict';

ProductDetailController.$inject = ['$stateParams', '$rootScope', 'ProductService', 'BuildService'];
function ProductDetailController($stateParams, $rootScope, ProductService, BuildService) {
  var productDetailController = this;
  productDetailController.productId = $stateParams.productId;
  productDetailController.product = {};
  productDetailController.productBuilds = [];
  productDetailController.getProduct = getProduct;

  function getProduct(productId) {
    if (productId) {
      ProductService.findById(productId).then(function (response) {
        productDetailController.product = response.data;
        BuildService.findByProduct(productDetailController.product.name, {}).then(setBuilds);
        $rootScope.bodyClass = productDetailController.product.name;
      });
    }
  }

  function setBuilds(response) {
    productDetailController.productBuilds = response.data;
  }

  getProduct(productDetailController.productId);
}
