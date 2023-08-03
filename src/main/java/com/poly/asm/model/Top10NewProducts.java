package com.poly.asm.model;

import java.util.Date;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Top10NewProducts {

     @Id
     private String id;
     private String name;
     private int quantity;
     private float price;
     private String description;
     private boolean status;
     private String image1;
     private String image2;
     private Date orderDate;
}
