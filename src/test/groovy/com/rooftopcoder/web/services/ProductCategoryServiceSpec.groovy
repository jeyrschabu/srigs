package com.rooftopcoder.web.services

import com.rooftopcoder.web.data.ModelProvider
import com.rooftopcoder.web.models.ProductCategory
import spock.lang.Specification

class ProductCategoryServiceSpec extends Specification{

    def "should return a list of categories"() {
        given:
            def provider = Mock(ModelProvider)
            ProductCategoryService service = new ProductCategoryService()
            service.modelProvider =  provider

            provider.findAll() >> [new ProductCategory()]
        when:
            def result = service.findAll()
        then:
            result.size() == 1
    }
}
