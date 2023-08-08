package com.poly.asm.controller.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poly.asm.model.Account;
import com.poly.asm.respository.UserRepository;
import com.poly.asm.rest.controller.AccountRestController;

@Service
@RequestMapping("/pcgearhub")
@RestController
public class UserService implements UserDetailsService {

	@Autowired
	AccountRestController a;

	@Autowired
	UserRepository userDao;
	@Autowired
	BCryptPasswordEncoder pe;
	String idString = "";

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		idString = username;
		try {
			Account user = userDao.findById(username).get();
			String role = user.isAdmin() ? "ADMIN" : "USER";
			a.userAccount(user);
			return User.withUsername(username).password(pe.encode(user.getPassword())).roles(role).build();
		} catch (Exception e) {
			throw new UsernameNotFoundException("User not found");
		}
	}
}