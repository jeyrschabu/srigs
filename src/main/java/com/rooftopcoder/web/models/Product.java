package com.rooftopcoder.web.models;


import lombok.*;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Field;
import org.mongodb.morphia.annotations.Index;
import org.mongodb.morphia.annotations.Indexes;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)

@Indexes(@Index(fields = { @Field("category") }) )
@Entity("products")
public class Product extends Model {
    private String name;
    private String category;
    private String coverImage;
    private Double price;
    private List<Spec> specs;
    private List<Mark> marks;

}
