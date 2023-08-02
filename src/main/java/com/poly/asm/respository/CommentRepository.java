package com.poly.asm.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.poly.asm.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
	// Các phương thức truy vấn tùy chỉnh nếu cần
	List<Comment> findAllByProduct_Id(String productId);
}