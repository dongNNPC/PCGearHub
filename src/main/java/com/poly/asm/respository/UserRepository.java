package com.poly.asm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.poly.asm.model.Report;
import com.poly.asm.model.Account;

// @Repository
@Service
public interface UserRepository extends JpaRepository<Account, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
	@Query("SELECT new com.poly.asm.model.Report( COUNT(u.id) AS totalUser ) "
        + " FROM Account u  WHERE admin = 0")
	List<Report> getTotalUser();
}