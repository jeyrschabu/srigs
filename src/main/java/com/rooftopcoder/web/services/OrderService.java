package com.rooftopcoder.web.services;

import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.data.providers.ModelProvider;
import com.rooftopcoder.web.models.Order;
import com.rooftopcoder.web.models.Spec;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

/**
 * Created by jeyrschabu on 9/1/16.
 */
public class OrderService extends BaseService<Order> {
    private static final String INITIAL_DATA = "";

    public OrderService setDataProvider(MongoConnectionConfig config) {
        super.setDataProvider(config, Order.class);
        return this;
    }

    protected String getInitialJsonData() {
        return INITIAL_DATA;
    }

    protected ModelProvider<Order> getProvider() {
        return modelProvider;
    }
}
