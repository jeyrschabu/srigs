package com.rooftopcoder.web.models;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
public class Spec {
    private String name;
    private String type;
    private Double weight; //in lbs
    private Double price;
    private Double wattage;
}
