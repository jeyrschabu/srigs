package com.rooftopcoder.web.resources;

import com.rooftopcoder.web.models.ProductCategory;
import com.rooftopcoder.web.services.ProductCategoryService;
import com.rooftopcoder.web.services.ProductService;

import static spark.Spark.get;

public class ProductResource extends GeneralResource {
    private ProductService productService;
    private ProductCategoryService categoryService;

    public ProductResource(ProductService productService, ProductCategoryService categoryService) {
        super();
        this.productService = productService;
        this.categoryService = categoryService;
    }

    protected void routes() {
        //READ BY CATEGORY
        get(CONTEXT+"/products/categories/:category", (request, response) -> {
            ProductCategory productCategory = this.categoryService.find("shortName", request.params("category"));
            response.header("Content-Encoding", "gzip");
            return this.productService.findByCategory(productCategory.getName());
        }, json());

        //READ ALL
        get(CONTEXT+"/products", (request, response) -> this.productService.findAll(), json());

        //READ ONE
        get(CONTEXT+"/products/:id", (request, response) -> this.productService.find(request.params(":id")), json());

    }
}
