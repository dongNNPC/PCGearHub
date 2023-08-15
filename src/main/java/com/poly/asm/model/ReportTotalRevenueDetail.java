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
    private float totalPrice; // Thêm thuộc tính totalRevenue vào constructor

    // Constructor không có tham số totalRevenue
    public ReportTotalRevenueDetail(String userName, String productName, Float productPrice,
    Integer quantity, Date orderDate, String paymentMethod) {
        this.userName = userName;
        this.productName = productName;
        this.productPrice = productPrice;
        this.quantity = quantity;
        this.orderDate = orderDate;
        this.paymentMethod = paymentMethod;
        this.totalPrice = productPrice * quantity;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

}
