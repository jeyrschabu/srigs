package com.rooftopcoder.web.data

import com.mongodb.MongoClient
import com.rooftopcoder.web.data.providers.DataProviderFacade
import com.rooftopcoder.web.models.Model
import spock.lang.Ignore
import spock.lang.Specification


class DataProviderFacadeSpec extends Specification {
  @Ignore
  def 'should create morphia provider'() {
    given:
    def config = new MongoConnectionConfig(new MongoClient(), 'database')
    when:
    def morphiaProvider = new DataProviderFacade<Model>().get(config, Model.class)
    then:
    noExceptionThrown()
    morphiaProvider != null
  }
}
