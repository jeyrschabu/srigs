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

}
