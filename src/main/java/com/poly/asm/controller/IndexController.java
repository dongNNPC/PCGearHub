package com.poly.asm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.poly.asm.controller.service.ProductService;
import com.poly.asm.model.Product;

@Controller
@RequestMapping("/pcgearhub")
public class IndexController {

	@Autowired
	ProductService pro_service;

	@RequestMapping("/index")
	public String index(Model model) {
		List<Product> list = pro_service.findAll();
		model.addAttribute("itemsAll", list);
		return "/index";
	}

	@RequestMapping("/detail-page/{id}")
	public String detailPage(Model model, @PathVariable("id") String id) {
		Product item = pro_service.findById(id);
		model.addAttribute("itemDetailPage", item);
		return "/views/detailPage";
	}

	// @RequestMapping("/profile")
	// public String profile() {

	// return "/views/profile";
	// }

	@RequestMapping("/profile/{id}")
	public String profileid() {

		return "/views/profile";
	}
}
