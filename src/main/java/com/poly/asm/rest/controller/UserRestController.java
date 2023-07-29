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

import com.poly.asm.model.User;
import com.poly.asm.respository.UserRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class UserRestController {
	@Autowired
	UserRepository dao;

	@GetMapping("/rest/users")
	public ResponseEntity<List<User>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/users/{id}")
	public ResponseEntity<User> getOne(@PathVariable("id") String id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/users")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<User> post(@RequestBody User user) {
		if (dao.existsById(user.getId())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(user);
		return ResponseEntity.ok(user);
	}

	@PutMapping("/rest/users/{id}")
	public ResponseEntity<User> put(@PathVariable("id") String id, @RequestBody User User) {
		if (!dao.existsById(id /* User.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(User);
		return ResponseEntity.ok(User);
	}

	@DeleteMapping("/rest/users/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
