package com.poly.asm.rest.controller;

import java.util.List;

import javax.servlet.http.HttpServlet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

import com.poly.asm.model.Account;
import com.poly.asm.model.Report;
import com.poly.asm.respository.UserRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/pcgearhub")
public class UserRestController extends HttpServlet {
	@Autowired
	UserRepository dao;

	@GetMapping("/rest/users")
	public ResponseEntity<List<Account>> getAll(Model model, Authentication authentication) {
		List<Account> accounts = dao.findAll();
		return ResponseEntity.ok(accounts);
	}

	
	@GetMapping("/rest/users/{id}")
	public ResponseEntity<Account> getOne(@PathVariable("id") String id) {
		// check xem id cs tồn tại trong cơ sở dữ liệu hay không trả về true or false
		if (!dao.existsById(id)) {
			return ResponseEntity.notFound().build();

		}
		return ResponseEntity.ok(dao.findById(id).get());
	}

	@GetMapping("/rest/users/invoice/{keywork}")
	public ResponseEntity<List<Account>> getUserInvoice(@PathVariable("keywork") String keywork) {

		return ResponseEntity.ok(dao.findUsersWithKeywordInInvoiceStatus(keywork));
	}

	@PostMapping("/rest/users")
	// đưa dữ liệu consumer lên rest API @requesstBody
	public ResponseEntity<Account> post(@RequestBody Account user) {
		if (dao.existsById(user.getId())) {
			return ResponseEntity.badRequest().build();
		}
		dao.save(user);
		return ResponseEntity.ok(user);
	}

	@PutMapping("/rest/users/{id}")
	public ResponseEntity<Account> put(@PathVariable("id") String id, @RequestBody Account User) {
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

	// tổng user
	@GetMapping("/rest/users/getTotalUser")
	public List<Report> getTotalUSer() {
		return dao.getTotalUser();
	}
}
