package com.poly.asm.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
}