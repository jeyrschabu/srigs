package com.rooftopcoder.web;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.rooftopcoder.web.configuration.ApplicationConfig;
import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.resources.*;
import com.rooftopcoder.web.services.*;
import org.aeonbits.owner.ConfigFactory;
import org.apache.commons.lang3.StringUtils;
import spark.servlet.SparkApplication;
import static com.rooftopcoder.web.constants.ApplicationConstants.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;

@Slf4j
public class Main implements SparkApplication {
  private static ApplicationConfig serverConfig = ConfigFactory.create(ApplicationConfig.class);

  public void init() {
    Main.initWithRoutes(shouldPopulateOnStartUp());
  }

  private static void initWithRoutes(boolean loadDataOnStartUp) {
    log.info("Initializing database");
    String database = "shadowrigs";
    String mongoHost = "localhost:27017";
    String userName = StringUtils.isEmpty(serverConfig.dbUser()) ? System.getenv(MONGO_USERNAME) : serverConfig.dbUser();
    String password = StringUtils.isEmpty(serverConfig.dbPass()) ? System.getenv(MONGO_PASSWORD) : serverConfig.dbPass();
    MongoClient mongoClient = new MongoClient();

    if (StringUtils.isNotEmpty(userName) && StringUtils.isNotEmpty(password)) {
      log.info("DB username provided");
      MongoCredential credential = MongoCredential.createCredential(userName,
        database, password.toCharArray());
      mongoClient = new MongoClient(new ServerAddress(mongoHost), Arrays.asList(credential));
    }

    log.info("Initializing services");
    final MongoConnectionConfig dbCfg = new MongoConnectionConfig(mongoClient, database);
    dbCfg.setLoadOnStartUp(loadDataOnStartUp);
    final ProductCategoryService categoryService = new ProductCategoryService().setDataProvider(dbCfg);
    final ProductService productService = new ProductService().setDataProvider(dbCfg);
    final SpecService specService = new SpecService().setDataProvider(dbCfg);
    final OrderService orderService = new OrderService().setDataProvider(dbCfg);
    final BuildService buildService = new BuildService().setDataProvider(dbCfg);

    log.info("Initializing routes");
    new ProductResource(productService, categoryService);
    new BuildResource(buildService);
    new ProductCategoryResource(categoryService);
    new SpecResource(specService);
    new HomeResource();
    new PaymentResource(orderService, serverConfig);
  }


  private boolean shouldPopulateOnStartUp() {
//    String populateOnStartUp = serverConfig.loadOnStartUp() == null ? System.getenv("POPULATE_ON_START_UP") : serverConfig.loadOnStartUp();
//    return !(StringUtils.isEmpty(populateOnStartUp) || populateOnStartUp.equalsIgnoreCase("disabled"));
    return true;
  }
}
