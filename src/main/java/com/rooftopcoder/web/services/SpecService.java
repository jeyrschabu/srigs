package com.rooftopcoder.web.services;

import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.data.providers.ModelProvider;
import com.rooftopcoder.web.models.Spec;

public class SpecService extends BaseService<Spec> {
    private static final String INITIAL_DATA = "specs.json";

    public SpecService setDataProvider(MongoConnectionConfig config) {
        super.setDataProvider(config, Spec.class);
        return this;
    }

    protected String getInitialJsonData() {
        return INITIAL_DATA;
    }

    protected ModelProvider<Spec> getProvider() {
        return modelProvider;
    }

}
