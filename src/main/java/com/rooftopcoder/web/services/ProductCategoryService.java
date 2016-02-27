package com.rooftopcoder.web.services;

import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.models.ProductCategory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProductCategoryService extends BaseService<ProductCategory> {

    private static final String INITIAL_DATA = "product-categories.json";
    private final Logger LOG = LoggerFactory.getLogger(ProductCategoryService.class);


    public ProductCategoryService setDataProvider(MongoConnectionConfig config) {
        super.setDataProvider(config, ProductCategory.class);
        return this;
    }

    protected String getInitialJsonData() {
        return INITIAL_DATA;
    }


}
