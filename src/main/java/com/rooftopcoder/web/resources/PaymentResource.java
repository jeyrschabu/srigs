package com.rooftopcoder.web.resources;

/**
 * Created by jeyrschabu on 9/1/16.
 */

import com.braintreegateway.*;
import com.google.gson.Gson;
import com.rooftopcoder.web.configuration.ApplicationConfig;
import com.rooftopcoder.web.exception.AppException;
import com.rooftopcoder.web.models.Order;
import com.rooftopcoder.web.services.OrderService;
import lombok.extern.slf4j.Slf4j;
import spark.Request;
import spark.Response;

import java.math.BigDecimal;

import static spark.Spark.get;
import static spark.Spark.post;

@Slf4j
public class PaymentResource extends GeneralResource {
    private BraintreeGateway gateway;
    private OrderService orderService;

    public PaymentResource(OrderService orderService, ApplicationConfig serverConfig) {
        this.orderService = orderService;
        this.gateway = new BraintreeGateway( Environment.SANDBOX,
                serverConfig.braintreeMerchantId(), serverConfig.braintreePublicKey(), serverConfig.braintreePrivateKey());
    }

    protected void routes() {
        post(CONTEXT+"/payment/submit", this::submitPayment);
        get(CONTEXT+"/payment/clientToken", (request, response) -> this.gateway.clientToken().generate());

    }

    private Result<Transaction> submitPayment(Request request, Response response) throws AppException {
        try {
            log.info("Beginning transaction");

            Order order = new Gson().fromJson(request.body(), Order.class);
            TransactionRequest transactionRequest = new TransactionRequest()
                    .amount(new BigDecimal(order.getTotal()))
                    .paymentMethodNonce(order.getPaymentInfo())
                    .options()
                    .submitForSettlement(true)
                    .done();

            Result<Transaction> result = gateway.transaction().sale(transactionRequest);
            log.info("Transaction was successful {}", result.isSuccess());
            if (result.isSuccess()) {
                orderService.insert(order);
            }
            return result;
        } catch (Exception e) {
            throw new AppException("transaction failed", e);
        }

    }
}
