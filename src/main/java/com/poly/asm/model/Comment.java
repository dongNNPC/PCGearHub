package com.poly.asm.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String content;

	private int likeCount;

	@Temporal(TemporalType.DATE)
	private Date orderDate;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private Account user;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	// constructors, getters, and setters
}