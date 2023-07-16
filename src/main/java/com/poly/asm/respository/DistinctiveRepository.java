package com.poly.asm.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Distinctive;

@Repository
public interface DistinctiveRepository extends JpaRepository<Distinctive, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
}