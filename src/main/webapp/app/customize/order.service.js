/**
 * Created by jeyrschabu on 9/1/16.
 */

'use strict';

function OrderService($http, API_PREFIX) {
    var orderService = this;

    function placeOrder(data) {
        return $http({
            url: API_PREFIX + '/order',
            method: 'POST',
            data: data
        });
    }

    orderService.placeOrder = placeOrder;
}
