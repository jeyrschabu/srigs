package com.rooftopcoder.web.models;

import lombok.*;
import org.mongodb.morphia.annotations.Entity;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
@Entity("builds")
public class Build extends Model {
  private String name;
  private String product;
  private String blobDescription;
  private Double price;
  private String brand;
  private List<Spec> specs;
}
