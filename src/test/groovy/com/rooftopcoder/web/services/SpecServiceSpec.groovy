package com.rooftopcoder.web.services

import com.rooftopcoder.web.data.providers.ModelProvider
import com.rooftopcoder.web.models.Product
import com.rooftopcoder.web.models.Spec
import spock.lang.Specification

class SpecServiceSpec extends Specification {

    def 'should return a list of specs'() {
        given:
            def provider = Mock(ModelProvider)
            SpecService specService = new SpecService()
            specService.modelProvider =  provider

            provider.findAll() >> [new Spec()]
        when:
            def result = specService.findAll()
        then:
            result.size() == 1
    }
}
