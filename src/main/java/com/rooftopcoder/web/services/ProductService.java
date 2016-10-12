package com.rooftopcoder.web.services;

import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.data.providers.ModelProvider;
import com.rooftopcoder.web.models.Product;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
public class ProductService extends BaseService<Product> {
  private static final String INITIAL_DATA = "products.json";

  public ProductService setDataProvider(MongoConnectionConfig config) {
    super.setDataProvider(config, Product.class);
    return this;
  }

  protected String getInitialJsonData() {
    return INITIAL_DATA;
  }

  protected ModelProvider<Product> getProvider() {
    return modelProvider;
  }

  public List<Product> findByCategory(String category) {
    return findMany("category", category);
  }
}
