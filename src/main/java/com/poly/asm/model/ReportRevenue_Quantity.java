package com.poly.asm.model;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportRevenue_Quantity {
    @Id
    private double totalRevenue;
	private long totalQuantity;
	
}
