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
@Table(name = "Users")
public class User {
	@Id
	private String id;
	private String name;

	private String password;

	private String phone;

	private String email;

	private String address;

	private String image;

	private boolean admin;

	private boolean status;

	private Boolean confirm;

	private String otp;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Comment> comments;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Invoice> invoices;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Cart> carts;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<UserHistory> userHistories;

	// constructors, getters, and setters
}
