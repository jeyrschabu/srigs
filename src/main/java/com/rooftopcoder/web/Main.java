package com.rooftopcoder.web;

import com.mongodb.MongoClient;
import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.resources.HomeResource;
import com.rooftopcoder.web.resources.ProductCategoryResource;
import com.rooftopcoder.web.resources.ProductFeatureResource;
import com.rooftopcoder.web.resources.ProductResource;
import com.rooftopcoder.web.services.ProductCategoryService;
import com.rooftopcoder.web.services.ProductFeatureService;
import com.rooftopcoder.web.services.ProductService;
import spark.servlet.SparkApplication;

public class Main implements SparkApplication{

    public void init() {
        Main.initWithRoutes();
    }

    private static void initWithRoutes() {
        final MongoConnectionConfig mongoConnectionConfig = new MongoConnectionConfig(new MongoClient(), "shadow-rigs");

        final ProductCategoryService categoryService = new ProductCategoryService().setDataProvider(mongoConnectionConfig);
        final ProductService productService = new ProductService().setDataProvider(mongoConnectionConfig);
        final ProductFeatureService featureService = new ProductFeatureService().setDataProvider(mongoConnectionConfig);

        new ProductResource(productService, categoryService);
        new ProductCategoryResource(categoryService);
        new ProductFeatureResource(featureService);
        new HomeResource();
    }
}
