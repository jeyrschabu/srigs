package com.rooftopcoder.web.services;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.data.providers.ModelProvider;
import com.rooftopcoder.web.models.Product;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Slf4j
public class ProductService extends BaseService<Product> {
  private static final String INITIAL_DATA = "products.json";
  private LoadingCache<String, List<Product>> cache = buildCache(30);

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

  public void loadCache() {
    try {
      cache.get("gaming");
    } catch (ExecutionException e) {
      log.debug("failed to load cache", e);
    }
  }

  private LoadingCache<String, List<Product>> buildCache(long duration) {
    return CacheBuilder.newBuilder()
      .maximumSize(1000)
      .expireAfterWrite(duration, TimeUnit.DAYS)
      .build(
        new CacheLoader<String, List<Product>>() {
          public List<Product> load(String category) {
            return findByCategory(category);
          }
        }
      );
  }
}
