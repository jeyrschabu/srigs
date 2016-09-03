package com.rooftopcoder.web.models;

import lombok.*;
import org.mongodb.morphia.annotations.Entity;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)

@Entity("orders")
public class Order extends Model {

}