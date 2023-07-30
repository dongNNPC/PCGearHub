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

import com.poly.asm.model.Distinctive;
import com.poly.asm.respository.DistinctiveRepository;

import javax.servlet.http.HttpServlet;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class DistinctiveRestController extends HttpServlet {
	@Autowired
	DistinctiveRepository dao;

	@GetMapping("/rest/distinctive")
	public ResponseEntity<List<Distinctive>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/distinctive/{id}")
	public ResponseEntity<Distinctive> getOne(@PathVariable("id") String id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/distinctive")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<Distinctive> post(@RequestBody Distinctive distinctive) {
		if (dao.existsById(distinctive.getId())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(distinctive);
		return ResponseEntity.ok(distinctive);
	}

	@PutMapping("/rest/distinctive/{id}")
	public ResponseEntity<Distinctive> put(@PathVariable("id") String id, @RequestBody Distinctive distinctive) {
		if (!dao.existsById(id /* Distinctive.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(distinctive);
		return ResponseEntity.ok(distinctive);
	}

	@DeleteMapping("/rest/distinctive/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
