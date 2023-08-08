package com.poly.asm.rest.controller;

import java.util.List;

import javax.servlet.http.HttpServlet;

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

import com.poly.asm.model.Ulike;
import com.poly.asm.respository.UlikeRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class UlikeRestController extends HttpServlet {
	@Autowired
	UlikeRepository dao;

	@GetMapping("/rest/ulikes")
	public ResponseEntity<List<Ulike>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/ulike/{id}")
	public ResponseEntity<Ulike> getOne(@PathVariable("id") int id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/ulike")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<Ulike> post(@RequestBody Ulike ulike) {

		dao.save(ulike);
		return ResponseEntity.ok(ulike);
	}

	@PutMapping("/rest/ulike/{id}")
	public ResponseEntity<Ulike> put(@PathVariable("id") int id, @RequestBody Ulike ulike) {
		if (!dao.existsById(id /* ulike.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(ulike);
		return ResponseEntity.ok(ulike);
	}

	@DeleteMapping("/rest/ulike/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
