package com.rooftopcoder.web.models

import org.bson.types.ObjectId
import spock.lang.Specification

class ModelSpec extends Specification {
    def 'should have functioning getters and setters'() {
        given:
            def model = new Model(id: new ObjectId('561db1ce0111ff4d8edd838a'))
        expect:
            model.getId() != null
    }
}
