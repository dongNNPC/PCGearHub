package com.poly.asm.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Accounts")
public class Account {
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

	@Override
	public String toString() {
		return "User{" + "id='" + id + '\'' + ", name='" + name + '\'' + ", password='" + password + '\'' + ", phone='"
				+ phone + '\'' + ", email='" + email + '\'' + ", address='" + address + '\'' + ", image='" + image
				+ '\'' + ", admin=" + admin + ", status=" + status + ", confirm=" + confirm + ", otp='" + otp + '\''
				+ '}';
	}

       
	// constructors, getters, and setters
}
