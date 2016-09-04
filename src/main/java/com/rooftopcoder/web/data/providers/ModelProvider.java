package com.rooftopcoder.web.data.providers;

import com.rooftopcoder.web.models.Model;

import java.util.List;

public interface ModelProvider<T extends Model> {
    List<T> findAll();
    void insert(List<T> list);
    void insert(T item);
    T findById(String id);
    T findOne(String key, String value);
    List<T> findMany(String key, String value);

}
