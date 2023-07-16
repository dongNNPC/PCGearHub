package com.poly.asm.rest;

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

import com.poly.asm.model.UserHistory;
import com.poly.asm.respository.UserHistoryRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class UserHistoryRestController {
	@Autowired
	UserHistoryRepository dao;

	@GetMapping("/rest/UserHistory")
	public ResponseEntity<List<UserHistory>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/UserHistory/{id}")
	public ResponseEntity<UserHistory> getOne(@PathVariable("id") int id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/UserHistory")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<UserHistory> post(@RequestBody UserHistory userHistory) {
		if (dao.existsById(userHistory.getId_history())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(userHistory);
		return ResponseEntity.ok(userHistory);
	}

	@PutMapping("/rest/UserHistory/{id}")
	public ResponseEntity<UserHistory> put(@PathVariable("id") int id, @RequestBody UserHistory UserHistory) {
		if (!dao.existsById(id /* UserHistory.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(UserHistory);
		return ResponseEntity.ok(UserHistory);
	}

	@DeleteMapping("/rest/UserHistory/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
