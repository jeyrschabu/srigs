package com.rooftopcoder.web.services;

import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.data.providers.ModelProvider;
import com.rooftopcoder.web.models.Build;

public class BuildService extends BaseService<Build> {
  private static final String INITIAL_DATA = "builds.json";

  public BuildService setDataProvider(MongoConnectionConfig config) {
    super.setDataProvider(config, Build.class);
    return this;
  }

  protected String getInitialJsonData() {
    return INITIAL_DATA;
  }

  protected ModelProvider<Build> getProvider() {
    return modelProvider;
  }
}
