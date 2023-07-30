package com.poly.asm.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.asm.model.Comment;
import com.poly.asm.respository.CommentRepository;

import javax.servlet.http.HttpServlet;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class CommentRestController extends HttpServlet {
	@Autowired
	CommentRepository dao;

	@GetMapping("/rest/comment")
	public ResponseEntity<List<Comment>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/comment/{id}")
	public ResponseEntity<Comment> getOne(@PathVariable("id") String id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/comment")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<Comment> post(@RequestBody Comment comment) {
		if (dao.existsById(comment.getId())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(comment);
		return ResponseEntity.ok(comment);
	}

	@PutMapping("/rest/comment/{id}")
	public ResponseEntity<Comment> put(@PathVariable("id") String id, @RequestBody Comment comment) {
		if (!dao.existsById(id /* comment.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(comment);
		return ResponseEntity.ok(comment);
	}

	@DeleteMapping("/rest/comment/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
