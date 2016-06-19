package com.rooftopcoder.web.models;

import lombok.*;

/**
 * Created by jeyrschabu on 6/18/16.
 */

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
public class Option {
    private String name;
    private String coverImage;
}
