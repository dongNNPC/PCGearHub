package com.poly.asm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Report;
import com.poly.asm.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
	@Query("SELECT new com.poly.asm.model.Report( COUNT(u.id) AS totalUser ) "
        + " FROM User u  WHERE admin = 0")
	List<Report> getTotalUser();
}