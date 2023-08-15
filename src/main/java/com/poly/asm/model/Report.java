package com.poly.asm.model;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    @Id
	private String id ;
	private int totalUser;
	private long totalQuantity ;
	private long totalInventory;
	private double totalRevenue;
	private long totalODer;
	

}
