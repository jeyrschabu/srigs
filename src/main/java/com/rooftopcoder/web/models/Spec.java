package com.rooftopcoder.web.models;

import lombok.*;
import org.mongodb.morphia.annotations.Entity;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
@Entity("specs")
public class Spec extends Model {
    private String name;
    private String type;
    private Double weight; //in lbs
    private Double price;
    private Double wattage;
    private String shortDescription;
    private String longDescription;
    private String coverImage;
}