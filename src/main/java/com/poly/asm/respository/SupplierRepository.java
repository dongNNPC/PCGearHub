package com.poly.asm.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
}