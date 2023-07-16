package com.poly.asm.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
}