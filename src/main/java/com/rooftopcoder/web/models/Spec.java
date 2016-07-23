package com.rooftopcoder.web.models;

import lombok.*;
import org.mongodb.morphia.annotations.Entity;

import java.util.List;

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
    private String fullImageLink;
    private String longDescription;
    private String coverImage;
    private List<Option> options;
}