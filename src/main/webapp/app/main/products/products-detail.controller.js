/**
 * Created by jeyrschabu on 7/21/16.
 */


ProductDetailController.$inject = ['$stateParams', '$rootScope', 'ProductService'];
function ProductDetailController($stateParams, $rootScope, ProductService) {
    var productDetailController = this;
    productDetailController.productId = $stateParams.productId;
    productDetailController.product = {};
    
    function getProduct(productId) {
        if (productId) {
            $rootScope.bodyClass = productDetailController.product.name;
            ProductService.findById(productId).then(function (response) {
                productDetailController.product = response.data;
                $rootScope.bodyClass = productDetailController.product.name;
            });
        }
    }

    getProduct(productDetailController.productId);
}