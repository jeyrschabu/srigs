package com.rooftopcoder.web.models

import spock.lang.Specification


class ProductSpec extends Specification {
    def 'should have functioning getters and setters'() {
        given:
            def product = new Product(name: 'name', category: 'category', price: 1500.0, specs: [], marks: [])
        expect:
            product.getName() == 'name'
            product.getCategory() == 'category'
            product.getPrice() == 1500.0
            product.getSpecs().isEmpty()
            product.getMarks().isEmpty()
    }
}
