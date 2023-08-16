package com.poly.asm.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Invoices")
public class Invoice {

	@Id
	private String id;


//	@Temporal(TemporalType.DATE)

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="order_date")
	private Date orderDate;
	
	private String address;
	private String status;
	private String node;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private Account user;

	@OneToMany(mappedBy = "invoice")
	@JsonIgnore
	private List<DetailedInvoice> detailedInvoices;

	public String getStatusName() {
		String statusName = "";
		switch (status) {
		case "pending":
			statusName = "Đang xác nhận";
			break;
		case "cancelled":
			statusName = "Đã hủy";
			break;
		case "delivery":
			statusName = "Đang vận chuyển";
			break;
		case "complete":
			statusName = "Đã giao thành công";
			break;
		}
		return statusName;
	}
}
