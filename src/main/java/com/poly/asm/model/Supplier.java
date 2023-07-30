package com.poly.asm.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "suppliers")
public class Supplier {
	@Id
	private String id;

	private String name;

	private String phoneNumber;

	private String email;

	private String address;

	@OneToMany(mappedBy = "supplier")
	@JsonIgnore
	private List<StockReceipt> stockReceipts;

	// constructors, getters, and setters
}