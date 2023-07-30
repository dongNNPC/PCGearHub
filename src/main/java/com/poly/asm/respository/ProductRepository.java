package com.poly.asm.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Category;
import com.poly.asm.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

	@Query("SELECT p.category FROM Product p WHERE p.id = ?1")
	Category findCategoryByProductId(String productId);
}