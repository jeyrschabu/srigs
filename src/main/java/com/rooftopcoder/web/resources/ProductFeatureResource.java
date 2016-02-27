package com.rooftopcoder.web.resources;

import com.rooftopcoder.web.services.ProductFeatureService;

import static spark.Spark.get;

public class ProductFeatureResource extends GeneralResource {

    private ProductFeatureService productFeatureService;

    public ProductFeatureResource(ProductFeatureService productFeatureService) {
        this.productFeatureService = productFeatureService;
    }

    protected void routes() {
        get(CONTEXT+"/features", (request, response) -> this.productFeatureService.findAll(), json());
    }
}
