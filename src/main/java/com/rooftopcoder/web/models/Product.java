package com.rooftopcoder.web.models;


import lombok.*;
import org.mongodb.morphia.annotations.Entity;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)

@Entity("products")
public class Product extends Model {
    private String name;
    private String category;
    private String coverImage;
    private Double price;
    private List<ProductFeature> features;
}
