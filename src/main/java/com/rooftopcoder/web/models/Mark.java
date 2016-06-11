package com.rooftopcoder.web.models;

import lombok.*;

import java.util.List;


@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
public class Mark {
    private String name;
    private String blobDescription;
    private Double price;
    private List<Spec> specs;
}