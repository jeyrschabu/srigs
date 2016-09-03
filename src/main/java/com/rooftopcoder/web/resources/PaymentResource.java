package com.rooftopcoder.web.resources;

/**
 * Created by jeyrschabu on 9/1/16.
 */

import com.braintreegateway.*;
import com.rooftopcoder.web.configuration.ApplicationConfig;
import spark.Request;
import spark.Response;

import java.math.BigDecimal;

import static spark.Spark.get;

public class PaymentResource extends GeneralResource {
    private BraintreeGateway gateway;

    public PaymentResource(ApplicationConfig serverConfig) {
        this.gateway = new BraintreeGateway( Environment.SANDBOX,
                serverConfig.braintreeMerchantId(), serverConfig.braintreePublicKey(), serverConfig.braintreePrivateKey());
    }

    protected void routes() {
        get(CONTEXT+"/payment/clientToken", (request, response) -> this.gateway.clientToken().generate());
        get(CONTEXT+"/payment/checkout", this::checkout);
    }

    private Boolean checkout(Request request, Response response) {
        String nonceFromTheClient = request.queryParams("payment_method_nonce");

        TransactionRequest transactionRequest = new TransactionRequest()
                .amount(new BigDecimal("10.00"))
                .paymentMethodNonce(nonceFromTheClient)
                .options()
                .submitForSettlement(true)
                .done();

        Result<Transaction> result = gateway.transaction().sale(transactionRequest);

        return result.isSuccess();
    }
}
