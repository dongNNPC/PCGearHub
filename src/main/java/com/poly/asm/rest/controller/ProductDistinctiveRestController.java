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

import com.poly.asm.model.ProductDistinctive;
import com.poly.asm.respository.ProductDistinctiveRepository;

import javax.servlet.http.HttpServlet;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class ProductDistinctiveRestController extends HttpServlet {
	@Autowired
	ProductDistinctiveRepository dao;

	@GetMapping("/rest/productDistinctives")
	public ResponseEntity<List<ProductDistinctive>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/productDistinctive/{id}")
	public ResponseEntity<ProductDistinctive> getOne(@PathVariable("id") int id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/productDistinctive")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<ProductDistinctive> post(@RequestBody ProductDistinctive productDistinctive) {
		dao.save(productDistinctive);
		return ResponseEntity.ok(productDistinctive);
	}

	@PutMapping("/rest/productDistinctive/{id}")
	public ResponseEntity<ProductDistinctive> put(@PathVariable("id") int id,
			@RequestBody ProductDistinctive productDistinctive) {
		if (!dao.existsById(id /* productDistinctive.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(productDistinctive);
		return ResponseEntity.ok(productDistinctive);
	}

	@DeleteMapping("/rest/productDistinctive/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
