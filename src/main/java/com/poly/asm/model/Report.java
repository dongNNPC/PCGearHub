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
	private long totalQuantity ;
	private long totalInventory;
	double totalRevenue;
	private long totalODer;

	public Report(double totalRevenue) {
		this.totalRevenue = totalRevenue;
	}
	
}
