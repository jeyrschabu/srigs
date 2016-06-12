package com.rooftopcoder.web.models

import spock.lang.Specification


class MarkSpec extends Specification {
    def 'should have functioning getters and setters'() {
        given:
            def mark = new Mark(name: 'name', blobDescription: 'description', price: 1500.0, specs: [], brand: "brand")
        expect:
            mark.getName() == 'name'
            mark.getBlobDescription() == 'description'
            mark.getPrice() == 1500.0
            mark.getSpecs().isEmpty()
            mark.getBrand() == 'brand'
    }
}
