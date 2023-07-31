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