package com.rooftopcoder.web.data;


import com.mongodb.MongoClient;

public class MongoConnectionConfig {
    private MongoClient mongoClient;
    private String databaseName;

    public MongoConnectionConfig(MongoClient mongoClient, String databaseName) {
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
