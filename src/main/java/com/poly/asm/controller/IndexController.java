package com.poly.asm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pcgearhub")
public class IndexController {

	@RequestMapping("/index")
	public String index() {

		return "/index";
	}

	@RequestMapping("/detail-page")
	public String detailPage() {

		return "/view/detailPage";
	}

	@RequestMapping("/profile")
	public String profile() {

		return "/views/profile";
	}

	@RequestMapping("/profile/{id}")
	public String profileid() {

		return "/views/profile";
	}
}
