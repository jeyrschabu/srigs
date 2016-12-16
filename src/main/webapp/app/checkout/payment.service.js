'use strict';

function PaymentService($http, API_PREFIX) {
    var paymentService = this;

    function submitPayment(data) {
        return $http({
            url: API_PREFIX + '/payment/submit',
            method: 'POST',
            data: data
        });
    }

    function getClientToken() {
        return $http({
            url: API_PREFIX + '/payment/clientToken',
            method: 'GET'
        });
    }

    paymentService.submitPayment = submitPayment;
    paymentService.getClientToken = getClientToken;
}
