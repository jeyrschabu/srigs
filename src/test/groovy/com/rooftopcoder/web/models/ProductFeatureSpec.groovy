package com.rooftopcoder.web.models

import spock.lang.Specification


class ProductFeatureSpec extends Specification {
    def 'should have functioning getters and setters'() {
        given:
            def option = new ProductFeature.Option(name: "option 1", price: 10.5, imageUrl: 'imageUrl')
            def feature = new ProductFeature(name: 'name', options: [option])
        expect:
            feature.getName() == 'name'
            feature.getOptions().get(0).equals(option)
            feature.getOptions().get(0).getImageUrl().equals(option.imageUrl)
            feature.getOptions().size() == 1
    }
}
