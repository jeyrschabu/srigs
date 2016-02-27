package com.rooftopcoder.web.data

import com.rooftopcoder.web.models.Product
import org.mongodb.morphia.Datastore
import org.mongodb.morphia.query.Query
import spock.lang.Specification


class MorphiaProviderSpec extends Specification{
    def 'should find all documents '() {
        given:
            def dataStore = Mock(Datastore);
            def provider = new MorphiaProvider(dataStore, Product.class)
            def query = Mock(Query)
            dataStore.createQuery(Product.class) >> query
            query.asList() >> [ new Product() ]
        expect:
            provider.findAll().size() == 1
    }

}
