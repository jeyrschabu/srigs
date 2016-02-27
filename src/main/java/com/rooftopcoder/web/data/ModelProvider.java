package com.rooftopcoder.web.data;

import com.rooftopcoder.web.models.Model;

import java.util.List;

public interface ModelProvider<T extends Model> {
    List<T> findAll();
    void insert(List<T> list);
    T findOne(String key, String value);
    List<T>  findMany(String key, String value);

}
