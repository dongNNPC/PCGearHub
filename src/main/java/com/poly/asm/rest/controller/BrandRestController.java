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

import com.poly.asm.model.Brand;
import com.poly.asm.respository.BrandRepository;

import javax.servlet.http.HttpServlet;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class BrandRestController extends HttpServlet {
	@Autowired
	BrandRepository dao;

	@GetMapping("/rest/brands")
	public ResponseEntity<List<Brand>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/brands/{id}")
	public ResponseEntity<Brand> getOne(@PathVariable("id") String id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/brands")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<Brand> post(@RequestBody Brand brand) {
		if (dao.existsById(brand.getId())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(brand);
		return ResponseEntity.ok(brand);
	}

	@PutMapping("/rest/brands/{id}")
	public ResponseEntity<Brand> put(@PathVariable("id") String id, @RequestBody Brand brand) {
		if (!dao.existsById(id /* brand.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(brand);
		return ResponseEntity.ok(brand);
	}

	@DeleteMapping("/rest/brands/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") String id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
