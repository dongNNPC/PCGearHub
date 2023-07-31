package com.poly.asm.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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