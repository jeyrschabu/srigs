package com.rooftopcoder.web;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.resources.HomeResource;
import com.rooftopcoder.web.resources.ProductCategoryResource;
import com.rooftopcoder.web.resources.ProductFeatureResource;
import com.rooftopcoder.web.resources.ProductResource;
import com.rooftopcoder.web.services.ProductCategoryService;
import com.rooftopcoder.web.services.ProductFeatureService;
import com.rooftopcoder.web.services.ProductService;
import spark.servlet.SparkApplication;
import static com.rooftopcoder.web.constants.ApplicationConstants.*;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;

@Slf4j
public class Main implements SparkApplication{

    public void init() {
        Main.initWithRoutes();
    }

    private static void initWithRoutes() {

        log.info("Initializing routes");

        String database = (System.getenv(MONGO_DATABASE) == null) ? DEFAULT_DB : System.getenv(MONGO_DATABASE);
        String mongoHost = (System.getenv(MONGO_HOST) == null) ? DEFAULT_HOST : System.getenv(MONGO_HOST);
        String userName = System.getenv(MONGO_USERNAME);
        String password = System.getenv(MONGO_PASSWORD);

        MongoClient mongoClient = new MongoClient();

        if (userName != null && password != null) {
            MongoCredential credential = MongoCredential.createCredential(userName,
                    database, password.toCharArray());
            mongoClient = new MongoClient(new ServerAddress(mongoHost), Arrays.asList(credential));
        }

        final MongoConnectionConfig dbCfg = new MongoConnectionConfig(mongoClient, database);

        final ProductCategoryService categoryService = new ProductCategoryService().setDataProvider(dbCfg);
        final ProductService productService = new ProductService().setDataProvider(dbCfg);
        final ProductFeatureService featureService = new ProductFeatureService().setDataProvider(dbCfg);

        new ProductResource(productService, categoryService);
        new ProductCategoryResource(categoryService);
        new ProductFeatureResource(featureService);
        new HomeResource();
    }
}
