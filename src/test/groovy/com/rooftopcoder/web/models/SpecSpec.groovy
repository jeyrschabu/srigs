package com.rooftopcoder.web.models

import spock.lang.Specification


class SpecSpec extends Specification {
    def 'should have functioning getters and setters'() {
        given:
            def spec = new Spec(name: 'name', type: 'type', wattage: 10, weight: 10)
        expect:
            spec.getName() == 'name'
            spec.getType() == 'type'
            spec.getWattage() == 10
            spec.getWeight() == 10
    }
}
