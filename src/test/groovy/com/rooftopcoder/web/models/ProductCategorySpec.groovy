package com.rooftopcoder.web.models

import spock.lang.Specification

class ProductCategorySpec extends Specification {
    def 'should have functioning getters and setters'() {
        given:
            def productCategory = new ProductCategory(name: 'name', shortName: 'shortName', coverImage:'coverImage',
                    description: 'description')
        expect:
            productCategory.getName() == 'name'
            productCategory.getShortName() == 'shortName'
            productCategory.getCoverImage() == 'coverImage'
            productCategory.getDescription() == 'description'
    }
}
