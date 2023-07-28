package com.poly.asm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.asm.respository.UserRepository;

@Controller
@RequestMapping("/pcgearhub/admin")
public class AdminController {

	@Autowired
	UserRepository dao;

	@RequestMapping("/index")
	public String index() {

		return "/admin/index";
	}

//Form

	@RequestMapping("/form-user/{id}")
	public String formUser(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-user";
	}

	@RequestMapping("/form-product/{id}")
	public String formProduct(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-product";
	}

//Table
	@RequestMapping("/table-user")
	public String tableUser(Model model) {
		return "/admin/views/table-user";
	}
		@RequestMapping("/table-product")
	public String tableProduct(Model model) {
		return "/admin/views/table-product";
	}

}
