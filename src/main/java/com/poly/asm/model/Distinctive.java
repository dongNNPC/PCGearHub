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
@Table(name = "distinctives")
public class Distinctive {
	@Id
	private String id;

	private String name;

	@OneToMany(mappedBy = "distinctive")
	@JsonIgnore
	private List<ProductDistinctive> productDistinctives;

	// constructors, getters, and setters
}