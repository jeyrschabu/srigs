package com.rooftopcoder.web.services

import com.rooftopcoder.web.data.providers.ModelProvider
import com.rooftopcoder.web.models.Product
import spock.lang.Specification

class ProductServiceSpec extends Specification{

    def 'should return a list of products'() {
        given:
            def provider = Mock(ModelProvider)
            ProductService productService = new ProductService()
            productService.modelProvider =  provider

            provider.findAll() >> [new Product()]
        when:
            def result = productService.findAll()
        then:
            result.size() == 1
    }
}
