/**
 * Created by jeyrschabu on 9/1/16.
 */

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

    paymentService.submitPayment = submitPayment;
}
