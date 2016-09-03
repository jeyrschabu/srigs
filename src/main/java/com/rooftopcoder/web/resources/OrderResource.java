package com.rooftopcoder.web.resources;

/**
 * Created by jeyrschabu on 9/1/16.
 */

import com.rooftopcoder.web.services.OrderService;

import static spark.Spark.post;

public class OrderResource extends GeneralResource {
    private OrderService orderService;
    public OrderResource(OrderService orderService) {
        this.orderService = orderService;
    }

    protected void routes() {
        post(CONTEXT+"/order", (request, response) -> this.orderService.placeOrder(request.body()));
    }
}
