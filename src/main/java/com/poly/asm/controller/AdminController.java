package com.poly.asm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pcgearhub/admin")
public class AdminController {

	@RequestMapping("/index")
	public String index() {

		return "/admin/index";
	}

	// Form

	@RequestMapping("/form-user/{id}")
	public String formUser(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-user";
	}

	@RequestMapping("/form-product/{id}")
	public String formProduct(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-product";
	}

	// Table
	@RequestMapping("/table-user")
	public String tableUser(Model model) {
		return "/admin/views/table-user";
	}

	@RequestMapping("/table-product")
	public String tableProduct(Model model) {
		return "/admin/views/table-product";
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


	@RequestMapping("/form-user_id/{id}")
	public String formuser_id(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-user_id";
	}

	@RequestMapping("/table-user_id")
	public String tableuser_id() {

		return "/admin/views/table-user_id";
	}

	@RequestMapping("/form-brand/{id}")
	public String formbrand(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-brand";
	}

	@RequestMapping("/table-brand")
	public String tablebrand() {

		return "/admin/views/table-brand";
	}


	
	@RequestMapping("/form-Distinctive/{id}")
	public String formDistinctive(Model model, @PathVariable("id") String key) {

		return "/admin/views/form-Distinctive";
	}

	// table category
	@RequestMapping("/table-Distinctive")
	public String tableDistinctive() {

		return "/admin/views/table-Distinctive";
	}


}
