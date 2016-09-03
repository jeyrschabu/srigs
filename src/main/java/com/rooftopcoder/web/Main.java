package com.rooftopcoder.web;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.rooftopcoder.web.configuration.ApplicationConfig;
import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.resources.*;
import com.rooftopcoder.web.services.OrderService;
import com.rooftopcoder.web.services.ProductCategoryService;
import com.rooftopcoder.web.services.ProductService;
import com.rooftopcoder.web.services.SpecService;
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
        Main.initWithRoutes();
    }

    private static void initWithRoutes() {

        log.info("Initializing database");

        String database  = serverConfig.db() == null ? DEFAULT_DB : serverConfig.db();
        String mongoHost = serverConfig.dbHost() == null ? DEFAULT_HOST : serverConfig.dbHost();
        String userName  = serverConfig.dbUser();
        String password  = serverConfig.dbPass();

        MongoClient mongoClient = new MongoClient();

        if (!StringUtils.isEmpty(userName) && !StringUtils.isEmpty(password)) {
            MongoCredential credential = MongoCredential.createCredential(userName,
                    database, password.toCharArray());
            mongoClient = new MongoClient(new ServerAddress(mongoHost), Arrays.asList(credential));
        }

        log.info("Initializing services");

        final MongoConnectionConfig dbCfg = new MongoConnectionConfig(mongoClient, database);

        final ProductCategoryService categoryService = new ProductCategoryService().setDataProvider(dbCfg);
        final ProductService productService = new ProductService().setDataProvider(dbCfg);
        final SpecService specService = new SpecService().setDataProvider(dbCfg);
        final OrderService orderService = new OrderService().setDataProvider(dbCfg);

        log.info("Initializing routes");

        new ProductResource(productService, categoryService);
        new ProductCategoryResource(categoryService);
        new SpecResource(specService);
        new HomeResource();
        new PaymentResource(serverConfig);
        new OrderResource(orderService);
    }
}
