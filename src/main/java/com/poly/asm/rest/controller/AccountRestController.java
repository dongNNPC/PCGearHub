package com.poly.asm.rest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.asm.model.Account;

@RequestMapping("/pcgearhub")
@RestController
public class AccountRestController {

	Account account = new Account();

	public Account userAccount(Account a) {
		return account = a;
	}

	@GetMapping("/api/user")
	public ResponseEntity<Account> getUser() {
		return ResponseEntity.ok(account);
	}
}
