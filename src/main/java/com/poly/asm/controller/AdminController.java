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

	@RequestMapping("/form-product")
	public String formProduct() {

		return "/admin/views/form-product";
	}

//Table
	@RequestMapping("/table-user")
	public String tableUsser() {

		return "/admin/views/table-user";
	}



	// Form category

	@RequestMapping("/form-category/{id}")
	public String formCategory(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-category";
	}

	// table category
	@RequestMapping("/table-category")
	public String tableCategory() {

		return "/admin/views/table-category";
	}

	




	@RequestMapping("/form-supplier/{id}")
	public String formSupplier(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-supplier";
	}


	@RequestMapping("/table-supplier")
	public String tableSupplier() {

		return "/admin/views/table-supplier";
	}



	@RequestMapping("/form-brand/{id}")
	public String formbrand(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-brand";
	}

	// table category
	@RequestMapping("/table-brand")
	public String tablebrand() {

		return "/admin/views/table-brand";
	}


}
