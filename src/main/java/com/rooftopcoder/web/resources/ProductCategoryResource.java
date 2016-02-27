package com.rooftopcoder.web.resources;

import com.rooftopcoder.web.services.ProductCategoryService;

import static spark.Spark.get;

public class ProductCategoryResource extends GeneralResource {

    private ProductCategoryService productCategoryService;

    public ProductCategoryResource(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    protected void routes() {
        get(CONTEXT+"/categories", (request, response) -> this.productCategoryService.findAll(), json());
    }
}
