package com.poly.asm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pcgearhub/admin")
public class AdminController {

	@RequestMapping("/index")
	public String index() {

		return "/admin/index";
	}

	@RequestMapping("/form-user")
	public String formUser() {

		return "/admin/views/form-user";
	}

	@RequestMapping("/form-product")
	public String formProduct() {

		return "/admin/views/form-product";
	}
}
