package com.rooftopcoder.web.models;

import lombok.*;
import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Id;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
public class Model {
    @Id private ObjectId id;
}
