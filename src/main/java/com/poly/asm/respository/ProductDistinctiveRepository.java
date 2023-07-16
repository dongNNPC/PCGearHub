package com.poly.asm.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.ProductDistinctive;

@Repository
public interface ProductDistinctiveRepository extends JpaRepository<ProductDistinctive, Integer> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
}