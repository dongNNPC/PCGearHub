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

import com.poly.asm.model.Supplier;
import com.poly.asm.respository.SupplierRepository;

import javax.servlet.http.HttpServlet;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class SupplierRestController extends HttpServlet {
	@Autowired
	SupplierRepository dao;

	@GetMapping("/rest/supplier")
	public ResponseEntity<List<Supplier>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/supplier/{id}")
	public ResponseEntity<Supplier> getOne(@PathVariable("id") String id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/supplier")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<Supplier> post(@RequestBody Supplier supplier) {
		if (dao.existsById(supplier.getId())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(supplier);
		return ResponseEntity.ok(supplier);
	}

	@PutMapping("/rest/supplier/{id}")
	public ResponseEntity<Supplier> put(@PathVariable("id") String id, @RequestBody Supplier supplier) {
		if (!dao.existsById(id /* Supplier.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(supplier);
		return ResponseEntity.ok(supplier);
	}

	@DeleteMapping("/rest/supplier/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
