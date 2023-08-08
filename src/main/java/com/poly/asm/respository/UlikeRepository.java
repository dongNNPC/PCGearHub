package com.poly.asm.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.poly.asm.model.Ulike;

// @Repository
@Service
public interface UlikeRepository extends JpaRepository<Ulike, Integer> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
}