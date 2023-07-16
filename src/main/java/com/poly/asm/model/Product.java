package com.poly.asm.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Products")
public class Product {
	@Id
	private String id;

	private String name;

	private int quantity;

	private float price;

	private String description;

	private boolean status;

	private String image1;

	private String image2;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;

	@OneToMany(mappedBy = "product")
	@JsonIgnore
	private List<Comment> comments;

	@OneToMany(mappedBy = "product")
	@JsonIgnore
	private List<DetailedInvoice> detailedInvoices;

	@OneToMany(mappedBy = "product")
	@JsonIgnore
	private List<Cart> carts;

	@OneToMany(mappedBy = "product")
	@JsonIgnore
	private List<ProductDistinctive> productDistinctives;

	// constructors, getters, and setters
}