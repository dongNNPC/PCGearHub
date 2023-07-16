package com.poly.asm.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
}