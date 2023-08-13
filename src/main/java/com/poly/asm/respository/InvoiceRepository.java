package com.poly.asm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần

	List<Invoice> findByStatusContainingIgnoreCase(String keyword);

	@Query("SELECT i FROM Invoice i JOIN i.detailedInvoices d " +
			"WHERE i.user.id = ?1 AND i.status = 'pending' " +
			"GROUP BY i.id, i.orderDate, i.address, i.status, i.user.id " +
			"ORDER BY i.orderDate DESC")
	List<Invoice> findByUsernameStatusPending(String username);

	@Query("SELECT i FROM Invoice i WHERE i.user.id=?1 and status = 'delivery'" +
			"GROUP BY i.id, i.orderDate, i.address, i.status, i.user.id " +
			"ORDER BY i.orderDate DESC")
	List<Invoice> findByUsernameStatusDelivery(String username);

	@Query("SELECT i FROM Invoice i WHERE i.user.id=?1 and status = 'complete'" +
			"GROUP BY i.id, i.orderDate, i.address, i.status, i.user.id " +
			"ORDER BY i.orderDate DESC")
	List<Invoice> findByUsernameStatusComplete(String username);

	@Query("SELECT i FROM Invoice i WHERE i.user.id=?1 and status = 'cancelled'" +
			"GROUP BY i.id, i.orderDate, i.address, i.status, i.user.id " +
			"ORDER BY i.orderDate DESC")
	List<Invoice> findByUsernameStatusCancelled(String username);

}