package com.rooftopcoder.web.resources;

/**
 * Created by jeyrschabu on 9/1/16.
 */

import com.braintreegateway.*;
import com.google.gson.Gson;
import com.rooftopcoder.web.configuration.ApplicationConfig;
import com.rooftopcoder.web.services.OrderService;
import spark.Request;
import spark.Response;

import java.math.BigDecimal;

import static spark.Spark.get;
import static spark.Spark.post;

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

    private Boolean submitPayment(Request request, Response response) {
        PaymentDetail paymentDetail = new Gson().fromJson(request.body(), PaymentDetail.class);
        TransactionRequest transactionRequest = new TransactionRequest()
                .amount(new BigDecimal(paymentDetail.getAmount()))
                .paymentMethodNonce(paymentDetail.getNonce())
                .options()
                .submitForSettlement(true)
                .done();

        Result<Transaction> result = gateway.transaction().sale(transactionRequest);

        return result.isSuccess();
    }

    static class PaymentDetail {
        private String nonce;
        private Double amount;

        public String getNonce() {
            return nonce;
        }

        public void setNonce(String nonce) {
            this.nonce = nonce;
        }

        public Double getAmount() {
            return amount;
        }

        public void setAmount(Double amount) {
            this.amount = amount;
        }
    }
}
