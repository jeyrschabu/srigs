package com.rooftopcoder.web.services;

import com.rooftopcoder.web.data.ModelProvider;
import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.models.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class ProductService extends BaseService<Product> {
    private static final String INITIAL_DATA = "products.json";
    private final Logger LOG = LoggerFactory.getLogger(ProductService.class);

    public ProductService setDataProvider(MongoConnectionConfig config) {
        super.setDataProvider(config, Product.class);
        return this;
    }

    protected String getInitialJsonData() {
        return INITIAL_DATA;
    }

    protected ModelProvider getProvider() {
        return modelProvider;
    }

    public List<Product> findByCategory(String category) {
        return findMany("category", category);
    }
}
