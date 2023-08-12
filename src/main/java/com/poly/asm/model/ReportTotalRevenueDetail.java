package com.poly.asm.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportTotalRevenueDetail {
	private String userName;
	private String productName;
	private float productPrice;
	private int quantity;
	private Date orderDate;
	private String paymentMethod;

}
