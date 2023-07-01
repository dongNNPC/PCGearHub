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
}
