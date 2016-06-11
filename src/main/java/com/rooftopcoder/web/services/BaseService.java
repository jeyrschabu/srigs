package com.rooftopcoder.web.services;


import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.rooftopcoder.web.data.DataProviderFacade;
import com.rooftopcoder.web.data.ModelProvider;
import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.models.Model;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public abstract class BaseService <T extends Model>{

    protected abstract String getInitialJsonData();
    protected ModelProvider<T> modelProvider;
    private Class<T> clazz;


    protected ModelProvider<T> getProvider() {
        return this.modelProvider;
    }

    protected void setDataProvider(MongoConnectionConfig config, Class<T> clazz) {
        this.clazz = clazz;
        this.modelProvider = new DataProviderFacade<T>().get(config, clazz);

    }

    public List<T> findAll() {
        List<T> items =  this.getProvider().findAll();

        if (items.isEmpty()) {
            initialDataLoad();
        }

        return items;
    }

    public T find(String key, String value) {
        return getProvider().findOne(key, value);
    }

    public List<T> findMany(String key, String value) {
        List<T> items =  getProvider().findMany(key, value);
        log.info("fetched {} items", items.size());

        if (items.isEmpty()) {
            log.info("Initializing on empty database {} items");
            initialDataLoad();
        }

        return items;
    }

    protected void initialDataLoad() {
        InputStream stream = getClass().getClassLoader().getResourceAsStream(getInitialJsonData());
        try {
            List<Map> list = new Gson().fromJson(IOUtils.toString(stream, "UTF-8"),
                    new TypeToken<List<HashMap<String, Object>>>() {}.getType());
            List<T> items = new ArrayList<>();

            for ( Map m : list) {
                items.add(new Gson().fromJson(new Gson().toJson(m), clazz));
            }
            getProvider().insert(items);
        } catch (IOException e) {
            log.error("Initial data load for products failed {}", e);
        } finally {
            IOUtils.closeQuietly(stream);
        }
    }
}
