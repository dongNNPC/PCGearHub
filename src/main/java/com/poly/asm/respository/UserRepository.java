package com.poly.asm.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.poly.asm.model.Account;

// @Repository
@Service
public interface UserRepository extends JpaRepository<Account, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
}