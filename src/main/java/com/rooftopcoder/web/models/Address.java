package com.rooftopcoder.web.models;

import lombok.*;

/**
 * Created by jeyrschabu on 9/3/16.
 */
@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
public class Address {
    private String street;
    private String state;
    private String zip;
}
