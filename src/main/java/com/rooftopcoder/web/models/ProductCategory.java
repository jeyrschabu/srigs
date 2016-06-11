package com.rooftopcoder.web.models;

import lombok.*;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.mongodb.morphia.annotations.Entity;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)

@Entity("categories")
public class ProductCategory extends Model {
    private String name;
    private String coverImage;
    private String shortName;
    private String description;
}
