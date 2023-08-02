package com.poly.asm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần

	List<Invoice> findByStatusContainingIgnoreCase(String keyword);

}