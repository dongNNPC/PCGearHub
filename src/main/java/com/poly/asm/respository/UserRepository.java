package com.poly.asm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.poly.asm.model.Account;
import com.poly.asm.model.Report;

// @Repository
@Service
public interface UserRepository extends JpaRepository<Account, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
	@Query("SELECT new com.poly.asm.model.Report( COUNT(u.id)  ) " + " FROM Account u  WHERE admin = 0")
	List<Report> getTotalUser();

	@Query("SELECT DISTINCT a FROM Account a " + "JOIN a.invoices i " + "WHERE LOWER(i.status) LIKE %:keyword%")
	List<Account> findUsersWithKeywordInInvoiceStatus(String keyword);

	Account findByEmail(String email);

}