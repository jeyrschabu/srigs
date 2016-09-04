package com.rooftopcoder.web.models;

import lombok.*;
import org.mongodb.morphia.annotations.Entity;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)

@Entity("orders")
public class Order extends Model {
    private String username;
    private Double total;
    private Address shippingAddress;
    private Address billingAddress;
    private List<LineItem> lineItems;
}