package com.rooftopcoder.web.resources;

/**
 * Created by jeyrschabu on 9/1/16.
 */

import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.Environment;

import static spark.Spark.get;

public class PaymentResource extends GeneralResource {
    private BraintreeGateway gateway;
    public PaymentResource() {
        this.gateway = new BraintreeGateway( Environment.SANDBOX, "5hd6vb56k2cz2vtx", "tck7kj4twbwwz49c", "576d15d92beba221da0912c8f63b7e51");
    }

    protected void routes() {
        get(CONTEXT+"/payment/clientToken", (request, response) -> this.gateway.clientToken().generate());
    }
}
