package com.rooftopcoder.web.services

import com.rooftopcoder.web.data.ModelProvider
import com.rooftopcoder.web.models.ProductFeature
import spock.lang.Specification

class ProductFeatureServiceSpec extends Specification{

    def "should return a list of features"() {
        given:
            def provider = Mock(ModelProvider)
            ProductFeatureService service = new ProductFeatureService()
            service.modelProvider =  provider

            provider.findAll() >> [new ProductFeature()]
        when:
            def result = service.findAll()
        then:
            result.size() == 1
    }
}
