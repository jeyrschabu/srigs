package com.rooftopcoder.web.configuration;

import org.aeonbits.owner.Config;

/**
 * Created by jkiluf on 4/13/16.
 */

@Config.Sources({"file:${CONFIG_FILE}"})
public interface ApplicationConfig extends Config {

  @Config.Key("config.mongo.database")
  String db();

  @Config.Key("config.mongo.username")
  String dbUser();

  @Config.Key("config.mongo.password")
  String dbPass();

  @Config.Key("config.mongo.host")
  String dbHost();

  @Config.Key("config.mongo.loadOnStartUp")
  String loadOnStartUp();

  @Config.Key("config.braintree.merchantId")
  String braintreeMerchantId();

  @Config.Key("config.braintree.publicKey")
  String braintreePublicKey();

  @Config.Key("config.braintree.privateKey")
  String braintreePrivateKey();
}
