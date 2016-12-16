package com.rooftopcoder.web.resources;

/**
 * Created by jeyrschabu on 9/1/16.
 */

import com.braintreegateway.*;
import com.google.gson.Gson;
import com.rooftopcoder.web.configuration.ApplicationConfig;
import com.rooftopcoder.web.exception.AppException;
import com.rooftopcoder.web.models.LineItem;
import com.rooftopcoder.web.models.Order;
import com.rooftopcoder.web.models.Spec;
import com.rooftopcoder.web.services.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.HtmlEmail;
import spark.Request;
import spark.Response;

import java.math.BigDecimal;
import java.net.URL;

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

            HtmlEmail email = new HtmlEmail();
            email.setHostName("mail.shadowrigs.com");
            email.setAuthentication("orders@shadowrigs.com", "0rd3rs-Sh4d0wr1g!!");
            email.setSmtpPort(465);
            email.setSSLOnConnect(true);
            email.setFrom("orders@shadowrigs.com", "Shadow Rigs");
            email.addTo(order.getUsername(), order.getUsername());
            email.setSubject("You ordered some products");

            String msg = "";
            msg += "<html>";
            msg += "<h1>Cart List</h1>";
            for (LineItem _item : order.getLineItems()) {
              msg += "<h2>" + _item.getName() + "</h2>";
              msg += "<p>Price: " + _item.getPrice() + "</p>";

              msg += "<br/>Components:<br/>";
              for (Spec _spec : _item.getSpecs()) {
                msg += "<p>" + _spec.getType() + ": " + _spec.getName() + "</p>";
              }
            }
            msg += "<br><b>Total price: " + order.getTotal() + "</b></br>";

            msg += "<h1>Billing Address</h1>";
            msg += "<p>" + order.getBillingAddress().getStreet() + ", " + order.getBillingAddress().getZip() + ", " + order.getBillingAddress().getState() + "</p>";
            msg += "<h1>Shipping Address</h1>";
            msg += "<p>" + order.getShippingAddress().getStreet() + ", " + order.getShippingAddress().getZip() + ", " + order.getShippingAddress().getState() + "</p>";
            msg += "</html>";


            email.setHtmlMsg(msg);
            email.send();




            HtmlEmail email2 = new HtmlEmail();
            email2.setHostName("mail.shadowrigs.com");
            email2.setAuthentication("orders@shadowrigs.com", "0rd3rs-Sh4d0wr1g!!");
            email2.setSmtpPort(465);
            email2.setSSLOnConnect(true);
            email2.setFrom("orders@shadowrigs.com", "Shadow Rigs");
            email2.addTo("orders@shadowrigs.com", "orders@shadowrigs.com");
            email2.setSubject(order.getUsername() + " ordered some products");
            email2.setHtmlMsg(msg);
            email2.send();

//            email.setHostName("smtp.googlemail.com");
//            email.setSmtpPort(465);
//            email.setAuthenticator(new DefaultAuthenticator("tycoon55777@gmail.com", ""));
//            email.setSSLOnConnect(true);

            // embed the image and get the content id
//            URL url = new URL("http://www.apache.org/images/asf_logo_wide.gif");
//            String cid = email.embed(url, "Apache logo");
//          email2.setHtmlMsg("<html>wegweg " + cid + "</html>");

          return result;
        } catch (Exception e) {
            throw new AppException("transaction failed", e);
        }

    }
}
