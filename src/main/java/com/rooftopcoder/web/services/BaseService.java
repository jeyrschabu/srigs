package com.rooftopcoder.web.services;


import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.rooftopcoder.web.data.DataProviderFacade;
import com.rooftopcoder.web.data.ModelProvider;
import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.models.Model;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public abstract class BaseService <T extends Model>{

    private final Logger LOG = LoggerFactory.getLogger(BaseService.class);

    protected abstract String getInitialJsonData();
    protected ModelProvider<T> modelProvider;
    private Class<T> clazz;


    protected ModelProvider getProvider() {
        return this.modelProvider;
    }

    protected void setDataProvider(MongoConnectionConfig config, Class<T> clazz) {
        this.clazz = clazz;
        this.modelProvider = new DataProviderFacade<T>().get(config, clazz);

    }

    public List<T> findAll() {
        List<T> items =  getProvider().findAll();

        if (items.isEmpty()) {
            initialDataLoad();
        }

        return items;
    }

    public T find(String key, String value) {
        return (T)getProvider().findOne(key, value);
    }

    protected void initialDataLoad() {
        InputStream stream = getClass().getClassLoader().getResourceAsStream(getInitialJsonData());
        try {
            String theString = IOUtils.toString(stream, "UTF-8");
            List<Map> list = new Gson().fromJson(theString, new TypeToken<List<HashMap<String, Object>>>() {}.getType());
            List<T> items = new ArrayList<>();

            for ( Map m : list) {
                items.add(new Gson().fromJson(new Gson().toJson(m), clazz));
            }
            getProvider().insert(items);
        } catch (IOException e) {
            LOG.error("Initial data load for products failed {}", e);
        } finally {
            IOUtils.closeQuietly(stream);
        }
    }
}
