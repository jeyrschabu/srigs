package com.rooftopcoder.web.services;

import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.models.ProductFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProductFeatureService extends BaseService<ProductFeature> {

    private static final String INITIAL_DATA = "product-features.json";
    private final Logger LOG = LoggerFactory.getLogger(ProductFeatureService.class);


    public ProductFeatureService setDataProvider(MongoConnectionConfig config) {
        super.setDataProvider(config, ProductFeature.class);
        return this;
    }

    protected String getInitialJsonData() {
        return INITIAL_DATA;
    }
}
