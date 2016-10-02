package com.rooftopcoder.web.data;


import com.mongodb.MongoClient;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

@Slf4j
public class MongoConnectionConfig {
  private MongoClient mongoClient;
  private String databaseName;
  private String DEFAULT_DATABASE = "shadowrigs";

  public MongoConnectionConfig(MongoClient mongoClient, String databaseName) {
    databaseName = StringUtils.isEmpty(databaseName) ? DEFAULT_DATABASE : databaseName;
    log.info("Connecting to {}", databaseName);
    setDatabaseName(databaseName);
    setMongoClient(mongoClient);
  }

  public MongoClient getMongoClient() {
    return mongoClient;
  }

  public void setDatabaseName(String databaseName) {
    this.databaseName = databaseName;
  }

  public void setMongoClient(MongoClient mongoClient) {
    this.mongoClient = mongoClient;
  }

  public String getDatabaseName() {
    return databaseName;
  }
}
