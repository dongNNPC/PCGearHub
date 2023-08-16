package com.poly.asm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Category;
import com.poly.asm.model.Product;
import com.poly.asm.model.Top10NewProducts;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

	@Query("SELECT p.category FROM Product p WHERE p.id = ?1")
	Category findCategoryByProductId(String productId);

	@Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', ?1, '%'))")
	List<Product> findProductsByNameAll(String name);

			@Query("SELECT new com.poly.asm.model.Top10NewProducts(p.id, p.name, p.quantity, p.price, p.description, p.status, p.image1, p.image2, sr.orderDate) "
				+ "FROM Product p INNER JOIN StockReceipt sr ON p.id = sr.product.id "
				+ " ORDER BY sr.orderDate DESC")
			List<Top10NewProducts> findProductsAndStockReceipts();


        
	@Query("SELECT p FROM Product p WHERE p.category.id = ?1")
	List<Product> findProductsByCategory(String id);

}