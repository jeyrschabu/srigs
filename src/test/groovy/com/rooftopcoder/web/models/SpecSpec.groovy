package com.rooftopcoder.web.models

import spock.lang.Specification


class SpecSpec extends Specification {
    def 'should have functioning getters and setters'() {
        given:
            def spec = new Spec(name: 'name', type: 'type', wattage: 10, weight: 10,
                    shortDescription: 'shortDescription', longDescription: 'longDescription', coverImage: '/cover.png')
        expect:
            spec.name == 'name'
            spec.type == 'type'
            spec.wattage.equals(Double.valueOf(10))
            spec.weight.equals(Double.valueOf(10))
            spec.shortDescription == 'shortDescription'
            spec.longDescription == 'longDescription'
            spec.coverImage == '/cover.png'
    }
}
