package com.rooftopcoder.web.data.providers;

import com.google.gson.Gson;
import com.rooftopcoder.web.models.Model;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;

import java.util.List;
import java.util.Map;

@Slf4j
public class MorphiaProvider<T extends Model> implements ModelProvider<T> {
  private Datastore datastore;
  private final Class<T> clazz;

  public MorphiaProvider(Datastore datastore, Class<T> clazz) {
    this.datastore = datastore;
    this.clazz = clazz;
  }

  public List<T> findAll() {
    final Query<T> query = datastore.createQuery(clazz);
    return query.asList();
  }

  public void insert(List<T> list) {
    log.info("Inserting {} items", list.size());
    datastore.save(list);
  }

  @Override
  public void insert(T item) {
    log.info("Inserting {} item", item);
    datastore.save(item);
  }

  public T findById(String id) {
    return datastore.find(clazz).field("_id").equal(new ObjectId(id)).get();
  }


  public T findOne(String key, String value) {
    final Query<T> query = datastore.createQuery(clazz);
    query.field(key).equal(value);
    return query.get();
  }

  public List<T> findMany(String key, String value) {
    final Query<T> query = datastore.createQuery(clazz);
    query.field(key).equal(value);

    return query.asList();
  }

  public List<T> find(Map<String, Object> filter) {
    final Query<T> query = datastore.createQuery(clazz);
    for (Map.Entry<String, Object> entry : filter.entrySet()) {
      query.field(entry.getKey()).equal(entry.getValue());
    }

    return query.asList();
  }
}
