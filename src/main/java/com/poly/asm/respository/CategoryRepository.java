package com.poly.asm.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
	
}
