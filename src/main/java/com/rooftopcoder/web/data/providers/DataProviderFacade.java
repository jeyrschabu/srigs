package com.rooftopcoder.web.data.providers;


import com.rooftopcoder.web.constants.ApplicationConstants;
import com.rooftopcoder.web.data.MongoConnectionConfig;
import com.rooftopcoder.web.data.providers.ModelProvider;
import com.rooftopcoder.web.data.providers.MorphiaProvider;
import com.rooftopcoder.web.models.Model;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;


public class DataProviderFacade<T extends Model> {

    private ModelProvider<T> morphiaProvider(MongoConnectionConfig config, Class<T> clazz) {
        final Morphia morphia = new Morphia();
        morphia.mapPackage(ApplicationConstants.MODELS_PACKAGE);
        final Datastore datastore = morphia.createDatastore(config.getMongoClient(), config.getDatabaseName());
        datastore.ensureIndexes();

        return new MorphiaProvider<>(datastore, clazz);
    }

    public ModelProvider<T> get(MongoConnectionConfig config, Class<T> clazz) {
        return morphiaProvider(config, clazz);
    }
}
