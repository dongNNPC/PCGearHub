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

import com.poly.asm.model.Cart;
import com.poly.asm.respository.CartRepository;

import javax.servlet.http.HttpServlet;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class CartRestController extends HttpServlet {
	@Autowired
	CartRepository dao;

	@GetMapping("/rest/cart")
	public ResponseEntity<List<Cart>> getAll(Model model) {
		return ResponseEntity.ok(dao.findAll());
	}

	@GetMapping("/rest/cart/{id}")
	public ResponseEntity<Cart> getOne(@PathVariable("id") int id) {
//check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false	
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@PostMapping("/rest/cart")
//	đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<Cart> post(@RequestBody Cart cart) {
		if (dao.existsById(cart.getId())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(cart);
		return ResponseEntity.ok(cart);
	}

	@PutMapping("/rest/cart/{id}")
	public ResponseEntity<Cart> put(@PathVariable("id") int id, @RequestBody Cart cart) {
		if (!dao.existsById(id /* cart.getId() */)) {
			return ResponseEntity.notFound().build();
		}
		dao.save(cart);
		return ResponseEntity.ok(cart);
	}

	@DeleteMapping("/rest/cart/{id}")
	public ResponseEntity<Void> delete(@PathVariable("id") int id) {
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		dao.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
