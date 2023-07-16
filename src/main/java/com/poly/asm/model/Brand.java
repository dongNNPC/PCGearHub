package com.poly.asm.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Brands")
public class Brand {
	@Id
	private String id;

	private String name;

	private String phoneNumber;

	private String email;

	private String address;

	@OneToMany(mappedBy = "brand")
	@JsonIgnore
	private List<StockReceipt> stockReceipts;

	// constructors, getters, and setters
}