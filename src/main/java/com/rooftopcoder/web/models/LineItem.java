package com.rooftopcoder.web.models;

import lombok.*;

import java.util.List;

/**
 * Created by jeyrschabu on 9/3/16.
 */

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
public class LineItem {
    private String name;
    private Double price;
    private Integer quantity;
    private String productId;
    private List<Spec> specs;
}
